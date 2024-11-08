import { Injectable } from '@nestjs/common';
import { ChatRoomDto, MessageDto, ParticipantDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { MessageModel } from 'src/core/models/message.model';
// import { ParticipantsModel } from 'src/core/models/participants.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class ChatFactoryService {
  constructor() {}

  createRoomChat(dto: ChatRoomDto) {
    const room = new ChatRoomModel();
    room.name = dto.name;
    room.isPrivate = true;
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

  // createParticipant(userId: number, chatRoomId: number) {
  //   console.log(userId, chatRoomId);
  //   const participant = new ParticipantsModel();
  //   if (userId) {
  //     const user = new UserModel();
  //     user.id = userId;
  //     participant.user = user;
  //   }
  //   if (chatRoomId) {
  //     const chatRoom = new ChatRoomModel();
  //     chatRoom.id = chatRoomId;
  //     participant.chatRoom = chatRoom;
  //   }
  //   return participant;
  // }
}
