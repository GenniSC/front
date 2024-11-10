export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface IAuth {
  authStatus?: AuthStatus;
  signUp?: any;
  signIn?: any;
  signOut?: any;
  access_token?: string;
  refresh_token?: string;
  expires?: Date;
  user?: IUser | null;
  setAccessToken?: (token: string) => void; // Adicionado no tipo IAuth
}
