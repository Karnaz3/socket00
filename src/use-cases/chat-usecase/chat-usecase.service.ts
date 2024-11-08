import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { ChatFactoryService } from './chat-factory.usecase.service';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class ChatUseCaseService {
  constructor(
    private readonly chatFactoryService: ChatFactoryService,
    private readonly dataService: IDataServices,
  ) {}

  async createSingleChat(dto: ChatRoomDto): Promise<ChatRoomModel> {
    let chatRoom: ChatRoomModel;
    chatRoom = await this.dataService.chatRoom.getOneOrNull({ participant: { id: dto.participant } });
    if (!chatRoom) {
      const room = this.chatFactoryService.createRoomChat(dto);
      chatRoom = await this.dataService.chatRoom.create(room);
    }
    // const participant = this.chatFactoryService.createParticipant(dto.participant, chatRoom.id);
    // await this.dataService.participant.create(participant);
    return await this.dataService.chatRoom.getOne({ id: chatRoom.id });
  }

  async getCreatedChatRooms() {
    return await this.dataService.chatRoom.getAllWithoutPagination({}, { participants: true });
  }
}
