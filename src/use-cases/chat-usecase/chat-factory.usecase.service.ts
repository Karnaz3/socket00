import { Injectable } from '@nestjs/common';
import { ChatRoomDto, MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { MessageModel } from 'src/core/models/message.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class ChatFactoryService {
  constructor() {}

  //worksfor single / private chat

  createRoomChat(dto: ChatRoomDto, sender, reciever) {
    const room = new ChatRoomModel();
    room.name = dto.name;
    room.isPrivate = true;
    room.user = [sender, reciever];
    return room;
  }

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

}
