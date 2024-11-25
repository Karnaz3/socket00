export interface JwtPayload {
  id: number;
  sub: string;
  iat: number;
  exp: number;
}
