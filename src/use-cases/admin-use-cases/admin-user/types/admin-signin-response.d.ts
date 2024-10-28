import { AdminModel } from 'src/core/models';

export type AdminSignInResponseType = {
  accessToken: string;
  user: AdminModel;
};
