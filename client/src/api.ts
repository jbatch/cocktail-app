function isJson(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

async function handleErrorOrParseResult(response: Response) {
  // catch any unstructured errors otherwise parse the response
  const json = await response.json();
  if (json.error) throw json;
  return json;
}

// log and rethrow an error unwrapping it if it's an actual error
function logAndThrowUnwrappedError(error: any) {
  console.error(error);
  throw error;
}

async function getRequest<Res>(url: string) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(handleErrorOrParseResult);
    return res as Res;
  } catch (err) {
    logAndThrowUnwrappedError(err);
  }
}

async function postRequest<Req, Res>(url: string, body: Req) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleErrorOrParseResult);
    return res as Res;
  } catch (err) {
    logAndThrowUnwrappedError(err);
  }
}

async function deleteRequest<Req, Res>(url: string, body?: Req) {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleErrorOrParseResult);

    return res as Res;
  } catch (err) {
    logAndThrowUnwrappedError(err);
  }
}

export async function attemptLogin(userName: string, password: string) {
  const body = { userName, password };
  return postRequest<PostLoginRequestBody, PostLoginResponseBody>('/api/users/authenticate', body);
}

export async function checkLoggedIn() {
  return getRequest<GetAuthenticatedResponseBody>('/api/users/authenticated');
}

export async function createUser(userObj: PostSignupRequestBody) {
  const body = userObj;
  return postRequest<PostSignupRequestBody, PostSignupResponseBody>('/api/users/signup', body);
}

export async function getIngredients() {
  return getRequest<GetIngredientsResponse>('/api/ingredients');
}

export async function createIngredient(body: CreateIngredientRequestBody) {
  return postRequest<CreateIngredientRequestBody, CreateIngredientResponseBody>('/api/ingredients', body);
}

export async function getRecipes() {
  return getRequest<GetRecipesResponse>('/api/recipes');
}

export async function createRecipe(body: CreateRecipeRequestBody) {
  return postRequest<CreateRecipeRequestBody, CreateRecipeResponseBody>('/api/recipes', body);
}
