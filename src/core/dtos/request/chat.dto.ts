import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  senderId?: number;
  @IsNotEmpty()
  chatRoomId: number;
}

export class ChatRoomDto {
  id?: number;
  name?: string;
  reciever?: number;
}

export class ParticipantDto {
  userId: number;
  chatRoomId: number;
}
