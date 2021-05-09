// For shared global interface types.

declare global {
  interface IUser {
    id: string;
    userName: string;
    isAdmin: boolean;
  }

  interface IIngredient {
    name: string;
    imageUrl: string;
  }
}

export type ExpressRequestUser = IUser;
