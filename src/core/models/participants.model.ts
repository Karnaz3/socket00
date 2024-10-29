import { ChatRoomModel } from './chat-room.model.ts.js';
import { UserModel } from './user.model.js';

export class ParticipantsModel {
  id: number;
  chatRoom: ChatRoomModel;
  user: UserModel;
}
