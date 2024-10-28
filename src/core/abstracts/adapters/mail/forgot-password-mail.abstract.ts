export interface IForgotPasswordDetail {
  email: string;
  token: string;
  username: string;
}

export abstract class IForgotPasswordEmailService {
  abstract sendForgotPasswordEmail(options: IForgotPasswordDetail): Promise<boolean>;
}
