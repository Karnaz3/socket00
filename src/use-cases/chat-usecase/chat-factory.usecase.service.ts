import { Injectable } from '@nestjs/common';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';

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
}
