import { IsNotEmpty, IsOptional } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  senderId?: number;
  @IsOptional()
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

export class GlobalChatDto {
  id?: number;
  message: string;
}
