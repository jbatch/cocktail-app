declare type TypedRequest<ReqParam = {}, ReqBody = {}, QueryParams = {}> = {
  params: ReqParam;
  body: ReqBody;
  query: QueryParams;
};
declare type TypedResponse<ResBody = any> = ResBody;

/**
 * Users Routes
 */

// POST /api/users/signup
declare type PostSignupRequestBody = { userName: string; password: string };
declare type PostSignupRequest = TypedRequest<{}, PostSignupRequestBody, {}>;
declare type PostSignupResponseBody = { loggedIn: boolean; user?: IUser };
declare type PostSignupResponse = TypedResponse<PostSignupResponseBody>;

// POST /api/users/authenticate
declare type PostLoginRequestBody = { userName: string; password: string };
declare type PostLoginRequest = TypedRequest<{}, PostLoginRequestBody, {}>;
declare type PostLoginResponseBody = { loggedIn: boolean; user?: IUser };
declare type PostLoginResponse = TypedResponse<PostLoginResponseBody>;

// POST /api/users/authenticated
declare type GetAuthenticatedRequestBody = {};
declare type GetAuthenticatedRequest = TypedRequest<{}, GetAuthenticatedRequestBody, {}>;
declare type GetAuthenticatedResponseBody = { loggedIn: boolean; user?: IUser };
declare type GetAuthenticatedResponse = TypedResponse<PostLoginResponseBody>;

/**
 * Ingredients Routes
 */

// GET /api/ingredients
declare type GetIngredientsRequestBody = {};
declare type GetIngredientsRequest = TypedRequest<{}, GetIngredientsRequestBody, {}>;
declare type GetIngredientsResponseBody = { ingredients: Array<IIngredient> };
declare type GetIngredientsResponse = TypedResponse<GetIngredientsResponseBody>;

// POST /api/ingredients
declare type CreateIngredientRequestBody = { name: string; imageUrl: string };
declare type CreateIngredientRequest = TypedRequest<{}, CreateIngredientRequestBody, {}>;
declare type CreateIngredientResponseBody = { ingredient: IIngredient };
declare type CreateIngredientResponse = TypedResponse<CreateIngredientResponseBody>;

/**
 * Recipes Routes
 */

// GET /api/recipes
declare type GetRecipesRequestBody = {};
declare type GetRecipesRequest = TypedRequest<{}, GetRecipesRequestBody, {}>;
declare type GetRecipesResponseBody = { recipes: Array<IRecipe> };
declare type GetRecipesResponse = TypedResponse<GetRecipesResponseBody>;

// POST /api/recipes
declare type CreateRecipeRequestBody = {
  name: string;
  imageUrl: string;
  ingredients: Array<{ ingredientId: number; amount: number; unit: IngredientUnit }>;
  method: string;
};
declare type CreateRecipeRequest = TypedRequest<{}, CreateRecipeRequestBody, {}>;
declare type CreateRecipeResponseBody = { recipe: IRecipe };
declare type CreateRecipeResponse = TypedResponse<CreateRecipeResponseBody>;

// GET /api/recipes/:recipeId
declare type GetRecipeRequestParams = {};
declare type GetRecipeRequest = TypedRequest<GetRecipeRequestParams, {}, {}>;
declare type GetRecipeResponseBody = { recipe: IRecipe };
declare type GetRecipeResponse = TypedResponse<GetRecipeResponseBody>;
