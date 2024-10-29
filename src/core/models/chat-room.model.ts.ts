import { MessageModel } from './message.model';
import { ParticipantsModel } from './participants.model';

export class ChatRoomModel {
  id: number;
  name: string;
  isPrivate: boolean;
  lastMessage: MessageModel;
  participants: ParticipantsModel;
}
