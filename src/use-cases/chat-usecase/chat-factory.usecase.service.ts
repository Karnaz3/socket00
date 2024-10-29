import { Injectable } from '@nestjs/common';
import { ChatRoomDto, MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { MessageModel } from 'src/core/models/message.model';
import { ParticipantsModel } from 'src/core/models/participants.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class ChatFactoryService {
  constructor() {}

  createMessagePrivate(dto: MessageDto): MessageModel {
    const message = new MessageModel();
    message.content = dto.content; // Assuming you might want a default content
    if (dto.senderId) {
      const sender = new UserModel();
      sender.id = dto.senderId;
      message.sender = sender;
    }
    if (dto.chatRoomId) {
      this.createChatRoomPrivate(dto.chatRoomId as unknown as ChatRoomDto);
    }
    return message;
  }

  createChatRoomPrivate(dto: ChatRoomDto): ChatRoomModel {
    const chatRoom = new ChatRoomModel();
    if (chatRoom.name) chatRoom.name = dto.name || 'Default Name';
    chatRoom.isPrivate = true;
    if (dto.participants) {
      const participants = new ParticipantsModel();
      participants.id = dto.participants.id;
      chatRoom.participants = participants;
    }
    return chatRoom;
  }
}
