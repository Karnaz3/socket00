export interface IJwtServicePayload {
  sub: string;
}
export interface IForgotPasswordPayload {
  sub: string;
  isPasswordResetToken: boolean;
}
export abstract class IJwtService {
  abstract checkToken<T>(token: string): Promise<T>;
  abstract createToken(payload: IJwtServicePayload): Promise<string>;
  abstract createResetPasswordToken(payload: any): Promise<string>;
}
