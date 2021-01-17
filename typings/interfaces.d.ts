// For shared global interface types.

declare global {
  interface IUser {
    id: string;
    userName: string;
    isAdmin: boolean;
  }
}

export type ExpressRequestUser = IUser;
