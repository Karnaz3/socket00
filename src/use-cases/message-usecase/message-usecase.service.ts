import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AppClsStore, IInvestorClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import AppException from 'src/application/exception/app.exception';
import { MessageFactoryService } from './message-factory.usecase.service';

@Injectable()
export class MessageUseCaseService {
  constructor(
    private readonly MessageFactoryService: MessageFactoryService,
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createMessage(dto: MessageDto) {
    const loggedInUser = this.cls.get<IInvestorClsData>('investorUser');
    const sender = await this.dataService.user.getOne({ id: loggedInUser.id });
    const message = this.MessageFactoryService.createMessageChat(dto);

    if (!message.sender) message.sender = sender;
    await this.checkIfUserIsInRoom(dto.chatRoomId, sender.id);
    return await this.dataService.message.create(message);
  }

  //exceptional errros prone

  async checkIfUserIsInRoom(chatRoomId: number, senderId: number) {
    let flag: boolean;
    const loggedInUser = await this.dataService.user.getOne({ id: senderId });
    if (!loggedInUser) throw new AppException({}, 'Unauthorized access', 401);
    const room = await this.dataService.chatRoom.getOne({ id: chatRoomId });
    room.user.forEach((user) => {
      if (user.id === senderId) {
        flag = true;
      }
    });
    if (!flag || flag === undefined) throw new AppException({}, 'Unauthorized access', 401);
    return true;
  }

  async getMessages(chatRoomId: number) {
    const loggedInUser = this.cls.get<IInvestorClsData>('investorUser');
    if (!loggedInUser) throw new AppException({}, 'Unauthorized access', 401);
    await this.checkIfUserIsInRoom(chatRoomId, loggedInUser.id);
    return await this.dataService.message.getAllWithoutPagination({ chatRoom: { id: chatRoomId } }, { sender: true });
  }
  async getMessagesSocket(chatRoomId: number, senderId: number) {
    const loggedInUser = await this.dataService.user.getOne({ id: senderId });
    if (!loggedInUser) throw new AppException({}, 'Unauthorized access', 401);
    await this.checkIfUserIsInRoom(chatRoomId, loggedInUser.id);
    return await this.dataService.message.getAllWithoutPagination({ chatRoom: { id: chatRoomId } }, { sender: true });
  }

  async createMessageSocket(dto: MessageDto, senderId: number) {
    const sender = await this.dataService.user.getOne({ id: senderId });
    const message = this.MessageFactoryService.createMessageChat(dto);
    if (!message.sender) message.sender = sender;
    await this.checkIfUserIsInRoom(dto.chatRoomId, sender.id);
    return await this.dataService.message.create(message);
  }
}
