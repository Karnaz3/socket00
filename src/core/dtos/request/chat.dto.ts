export class MessageDto {
  content?: string;
  sender?: boolean;
  senderId?: number;
  chatRoom?: boolean;
  chatRoomId?: number;
}

export class ChatRoomDto {
  name?: string;
  isPrivate?: boolean;
}

export class UserChatRoomDto {
  user?: boolean;
  userId?: number;
  chatRoom?: boolean;
  chatRoomId?: number;
}
