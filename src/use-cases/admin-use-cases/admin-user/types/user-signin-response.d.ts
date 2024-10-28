import { UserModel } from 'src/core/models';

export type UserSignInResponseType = {
  accessToken: string;
  user: UserModel;
};
