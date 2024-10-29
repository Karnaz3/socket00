import { ChatRoomModel } from './chat-room.model.ts';
import { MessageModel } from './message.model.js';
import { UserModel } from './user.model';

export class UserChatRoomModel {
  id: number;
  user: UserModel;
  chatRoom: ChatRoomModel;
  lastReadMessageId: MessageModel;
}
