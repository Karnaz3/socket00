import { IsNotEmpty } from 'class-validator';
import { MessageModel } from 'src/core/models/message.model';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  senderId?: number;
  chatRoomId?: number;
}

export class ChatRoomDto {
  id?: number;
  name?: string;
  reciever?: number
}

export class ParticipantDto {
  userId: number;
  chatRoomId: number;
}
