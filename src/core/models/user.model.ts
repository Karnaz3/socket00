export class UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  isVerified: boolean;
  isGoogleLogin: boolean;
  googleId: string;
  googleAccessToken: string;
  // googleRefreshToken: string;
}
