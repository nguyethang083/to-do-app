export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
type User = {
  userId: string;
  userName: string;
  password: string;
  role: Role;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
