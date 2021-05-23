// For shared global interface types.

declare global {
  interface IUser {
    id: string;
    userName: string;
    isAdmin: boolean;
  }

  type IngredientUnit = 'oz' | 'splash';

  type IRecipeIngredient = Omit<
    {
      ingredientId: number;
      amount: number;
      unit: string;
    } & IIngredient,
    'id'
  >;
  interface IIngredient {
    id: number;
    name: string;
    imageUrl: string;
  }

  interface IRecipe {
    id: number;
    name: string;
    imageUrl: string;
    method: string;
    ingredients: Array<IRecipeIngredient>;
  }
}

export type ExpressRequestUser = IUser;
