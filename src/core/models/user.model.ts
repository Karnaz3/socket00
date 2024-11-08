import { ChatRoomModel } from './chat-room.model.ts';

export class UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  isVerified: boolean;
  isOnline: boolean;
  isAdmin: boolean;
  chatRoom: ChatRoomModel[];
}
