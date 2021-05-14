import express from 'express';
import pino from 'pino';

import { Ingredient } from '../entity/Ingredient';
import { Recipe } from '../entity/Recipe';
import { RecipeIngredient } from '../entity/RecipeIngredient';
import { ServiceError } from '../error/service-error';
import { wrapExpressPromise } from '../util';

const logger = pino();

// Hosted at /api/ingredients
const ingredientsRoutes = express.Router();

ingredientsRoutes.get('/test', async (req: any, res: any) => {
  const daiquiri = await Recipe.findOne({ _id: 1 }, { relations: ['ingredients', 'ingredients.ingredient'] });
  // const simple = Ingredient.create({ name: 'Simple Syrup', imageUrl: '' });
  // await Ingredient.save(simple);
  // const recipeIngredient = RecipeIngredient.create({
  //   recipe_id: daiquiri._id,
  //   ingredient_id: simple._id,
  //   amount: 0.75,
  //   unit: 'oz',
  // });
  // RecipeIngredient.save(recipeIngredient);
  logger.info('Recipe: %s', JSON.stringify(daiquiri));
  res.json({ message: JSON.stringify(daiquiri) });
});

ingredientsRoutes.get(
  '/',
  wrapExpressPromise<GetIngredientsRequest, GetIngredientsResponse>(async (req, res) => {
    const ingredients = await Ingredient.find();

    return {
      ingredients: ingredients.map(mapIngredient),
    };
  })
);

ingredientsRoutes.post(
  '/',
  wrapExpressPromise<CreateIngredientRequest, CreateIngredientResponse>(async (req, res) => {
    const { name, imageUrl } = req.body;
    const existingIngredient = await Ingredient.findOne({ name });
    if (existingIngredient) {
      throw new ServiceError(`Ingredient already exists: ${name}`, 404);
    }
    const ingredient = await Ingredient.save(Ingredient.create({ name, imageUrl }));

    return {
      ingredient: mapIngredient(ingredient),
    };
  })
);

export function mapIngredient(ingredient: Ingredient): IIngredient {
  return {
    id: ingredient._id,
    name: ingredient.name,
    imageUrl: ingredient.imageUrl,
  };
}

export default ingredientsRoutes;
