import { IsNotEmpty } from 'class-validator';
import { MessageModel } from 'src/core/models/message.model';
import { ParticipantsModel } from 'src/core/models/participants.model';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  sender?: boolean;
  senderId?: number;
  chatRoom?: boolean;
  chatRoomId?: number;
}

export class ChatRoomDto {
  name?: string;
  isPrivate?: boolean;
  lastMessage: MessageModel;
  participants: ParticipantsModel;
}

export class ParticipantDto {
  userId: number;
  chatRoomId: number;
}
