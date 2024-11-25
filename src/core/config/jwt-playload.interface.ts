export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;

  /**
   * if user access the tech support without login they have to provide their name and they are registered as chat user
   * This is the chat user id
   */
  chatUserId?: string;
}

export interface IEventUserJwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  chatUserId?: string;
}
