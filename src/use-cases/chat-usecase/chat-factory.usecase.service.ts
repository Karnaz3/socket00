import { Injectable } from '@nestjs/common';
import { ChatRoomDto, MessageDto, UserChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { MessageModel } from 'src/core/models/message.model';
import { UserChatRoomModel } from 'src/core/models/user-chat-room.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class ChatFactoryService {
  constructor() {}

  createMessage(dto: MessageDto) {
    const message = new MessageModel();
    if (dto.content) message.content = dto.content;
    if (dto.sender) {
      const sender = new UserModel();
      sender.id = dto.senderId;
      message.sender = sender;
    }
    if (dto.chatRoom) {
      const chatRoom = new ChatRoomModel();
      chatRoom.id = dto.chatRoomId;
      message.chatRoom = chatRoom;
    }
    return message;
  }

  createChatRoom(dto: ChatRoomDto) {
    const chatRoom = new ChatRoomModel();
    if (dto.name) chatRoom.name = dto.name;
    if (dto.isPrivate) chatRoom.isPrivate = dto.isPrivate;
    return chatRoom;
  }

  createUserChatRoom(dto: UserChatRoomDto) {
    const userChatRoom = new UserChatRoomModel();
    if (dto.user) {
      const user = new UserModel();
      user.id = dto.userId;
      userChatRoom.user = user;
    }
    if (dto.chatRoom) {
      const chatRoom = new ChatRoomModel();
      chatRoom.id = dto.chatRoomId;
      userChatRoom.chatRoom = chatRoom;
    }
    return userChatRoom;
  }
}
