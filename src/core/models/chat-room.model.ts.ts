import { MessageModel } from './message.model';
import { UserModel } from './user.model';
// import { ParticipantsModel } from './participants.model';

export class ChatRoomModel {
  id: number;
  name: string;
  isPrivate: boolean;
  user: UserModel[];
  message: MessageModel[];
}
