import { Socket } from 'socket.io';

export function extractTokenFromHeader(socket: Socket): string | undefined {
  //console.log(socket.handshake);

  // First check: Extract token from socket.handshake.auth
  if (socket.handshake.auth?.token) {
    const [type, token] = socket.handshake.auth.token.split(' ') ?? [];
    //console.log('Auth Token Type:', type);
    //console.log('Auth Token:', token);
    return type === 'Bearer' ? token : undefined;
  }

  // Second check: Extract token from socket.handshake.headers.authorization
  if (socket.handshake.headers?.authorization) {
    const [type, token] = socket.handshake.headers.authorization.split(' ') ?? [];
    //console.log('Header Token Type:', type);
    //console.log('Header Token:', token);
    return type === 'Bearer' ? token : undefined;
  }

  // Return undefined if no valid token found
  return undefined;
}

// function to extract query params from socket
export function extractQueryParams(socket: Socket): { userId: string } {
  return socket.handshake.query as { userId: string };
}
