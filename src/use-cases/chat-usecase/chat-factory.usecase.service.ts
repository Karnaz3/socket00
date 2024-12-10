import { Injectable } from '@nestjs/common';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';

@Injectable()
export class ChatFactoryService {
  constructor() {}

  //worksfor single / private chat

  createRoomChat(dto: ChatRoomDto, sender, receiver) {
    const room = new ChatRoomModel();
    room.name = dto.name;
    room.isPrivate = true;
    room.user = [sender, receiver];
    return room;
  }

  createRoomChatPublic() {
    const room = new ChatRoomModel();
    room.name = 'Global Chat';
    room.isPrivate = false;
    return room;
  }
}
