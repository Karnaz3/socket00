import { Socket } from 'socket.io';

export function extractTokenFromHeader(socket: Socket): string | undefined {
  const [type, token] = socket?.handshake?.headers?.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

// function to extract query params from socket
export function extractQueryParams(socket: Socket): { eventId: string } {
  return socket.handshake.query as { eventId: string };
}
