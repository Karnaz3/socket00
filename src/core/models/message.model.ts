import { ChatRoomModel } from './chat-room.model.ts';
import { UserModel } from './user.model';

export class MessageModel {
  id: number;
  content: string;
  sender: UserModel;
  chatRoom: ChatRoomModel;
}
