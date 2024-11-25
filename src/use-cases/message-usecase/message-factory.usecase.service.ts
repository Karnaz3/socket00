import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { MessageModel } from 'src/core/models/message.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class MessageFactoryService {
  constructor() {}

  //worksfor single / private chat

  createMessageChat(dto: MessageDto) {
    const message = new MessageModel();
    message.content = dto.content;
    if (dto.chatRoomId) {
      const chatRoom = new ChatRoomModel();
      chatRoom.id = dto.chatRoomId;
      message.chatRoom = chatRoom;
    }
    if (message.sender) {
      const sender = new UserModel();
      sender.id = dto.senderId;
      message.sender = sender;
    }
    return message;
  }

  //createGlobalMessage(dto: GlobalMessageDto) {
  //  const message = new MessageModel();
  //  message.content = dto.content;
  //  if (dto.chatRoomId) {
  //    const chatRoom = new ChatRoomModel();
  //    chatRoom.id = dto.chatRoomId;
  //    message.chatRoom = chatRoom;
  //  }
  //  if (dto.senderId) {
  //    const sender = new UserModel();
  //    sender.id = dto.senderId;
  //    message.sender = sender;
  //  }
  //}
}
