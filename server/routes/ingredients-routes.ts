import express from 'express';
import pino from 'pino';

import { Ingredient } from '../entity/Ingredient';
import { ServiceError } from '../error/service-error';
import { wrapExpressPromise } from '../util';

const logger = pino();

// Hosted at /api/ingredients
const ingredientsRoutes = express.Router();

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
    const i = Ingredient.create({ name, imageUrl });
    const ingredient = await Ingredient.save(i);

    return {
      ingredient: mapIngredient(ingredient),
    };
  })
);

function mapIngredient(ingredient: Ingredient): IIngredient {
  return {
    name: ingredient.name,
    imageUrl: ingredient.imageUrl,
  };
}

export default ingredientsRoutes;
