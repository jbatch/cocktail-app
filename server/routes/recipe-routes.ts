import express from 'express';
import pino from 'pino';
import { In } from 'typeorm';

import { Recipe } from '../entity/Recipe';
import { RecipeIngredient } from '../entity/RecipeIngredient';
import { ServiceError } from '../error/service-error';
import { wrapExpressPromise } from '../util';
import { mapIngredient } from './ingredients-routes';
import { Ingredient } from '../entity/Ingredient';

const logger = pino();

// Hosted at /api/recipes
const recipesRoutes = express.Router();

recipesRoutes.get(
  '/',
  wrapExpressPromise<GetRecipesRequest, GetRecipesResponse>(async (req, res) => {
    const recipes = await Recipe.find({ relations: ['ingredients', 'ingredients.ingredient'] });

    logger.info('Recipe: %s', JSON.stringify(recipes, null, 2));
    return {
      recipes: recipes.map(mapRecipe),
    };
  })
);

recipesRoutes.post(
  '/',
  wrapExpressPromise<CreateRecipeRequest, CreateRecipeResponse>(async (req, res) => {
    const { name, imageUrl, ingredients } = req.body;
    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      throw new ServiceError(`Recipe already exists: ${name}`, 404);
    }

    // Check all ingredients exist in db before creating recipe.
    await validateIngredientsExist(ingredients.map((i) => i.ingredientId));

    let recipe = await Recipe.save(Recipe.create({ name, imageUrl }));

    await RecipeIngredient.save(
      ingredients.map(({ ingredientId, amount, unit }) =>
        RecipeIngredient.create({ recipe_id: recipe._id, ingredient_id: ingredientId, amount, unit })
      )
    );

    // Reload recipe with ingredients attached.
    recipe = await Recipe.findOne({ where: { _id: recipe._id }, relations: ['ingredients', 'ingredients.ingredient'] });

    return {
      recipe: mapRecipe(recipe),
    };
  })
);

function mapRecipe(recipe: Recipe): IRecipe {
  if (!recipe) {
    return null;
  }
  return {
    id: recipe._id,
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    ingredients: recipe.ingredients.map(mapRecipeIngredient),
  };
}

function mapRecipeIngredient(recipeIngredient: RecipeIngredient): IRecipeIngredient {
  if (!recipeIngredient || !recipeIngredient.ingredient) {
    return null;
  }
  // Rename 'id' => 'ingredientId'
  const { id: ingredientId, ...others } = mapIngredient(recipeIngredient.ingredient);
  const ingredient = { ingredientId, ...others };
  return {
    ...ingredient,
    amount: recipeIngredient.amount,
    unit: recipeIngredient.unit,
  };
}

async function validateIngredientsExist(ingredientIds: number[]) {
  const foundIngredients = (await Ingredient.find({ where: { _id: In(ingredientIds) } })).map((i) => i._id);
  logger.info('foundIngredients: %s', JSON.stringify(foundIngredients));
  if (foundIngredients.length !== ingredientIds.length) {
    const missingIds = ingredientIds.filter((i) => !foundIngredients.includes(i));
    throw new ServiceError(`Ingredients not found ${JSON.stringify(missingIds)}`);
  }
}

export default recipesRoutes;
