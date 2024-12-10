import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import AppException from 'src/application/exception/app.exception';
import { AppClsStore, IInvestorClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { ChatUseCaseService } from '../chat-usecase/chat-usecase.service';
import { MessageFactoryService } from './message-factory.usecase.service';

@Injectable()
export class MessageUseCaseService {
  constructor(
    private readonly messageServiceUseCase: MessageFactoryService,
    private readonly chatUseCaseService: ChatUseCaseService,
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createMessage(dto: MessageDto) {
    const loggedInUser = this.cls.get<IInvestorClsData>('investorUser');
    const sender = await this.dataService.user.getOne({ id: loggedInUser.id });
    const message = this.messageServiceUseCase.createMessageChat(dto);

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

  //get private messages
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
    const message = this.messageServiceUseCase.createMessageChat(dto);
    if (!message.sender) message.sender = sender;
    await this.checkIfUserIsInRoom(dto.chatRoomId, sender.id);
    return await this.dataService.message.create(message);
  }

  async getMessagePublicSocket(receiverId: number) {
    // Fetch the global chat room
    const room = await this.chatUseCaseService.getGlobalChatRoom();
    if (!room) {
      throw new AppException({}, 'Global chat room does not exist', 404);
    }

    // Validate the user
    const loggedInUser = await this.dataService.user.getOne({ id: receiverId });
    if (!loggedInUser) {
      throw new AppException({}, 'Unauthorized access', 401);
    }

    // Retrieve all messages in the global room with sender information
    return await this.dataService.message.getAllWithoutPagination({ chatRoom: { id: room.id } }, { sender: true });
  }

  async createMessagePublicSocket(dto: MessageDto, senderId: number) {
    // Fetch the global room
    const room = await this.chatUseCaseService.getGlobalChatRoom();
    // Validate the sender
    const sender = await this.dataService.user.getOne({ id: senderId });
    // Assign room and sender information to the DTO
    dto.chatRoomId = room.id;
    dto.senderId = sender.id;
    // Create the message
    const message = this.messageServiceUseCase.createMessageChat(dto);
    return await this.dataService.message.create(message);
  }

  //get public messages
  async getMessagesPublic() {
    const room = await this.chatUseCaseService.getGlobalChatRoom();
    const data = await this.dataService.message.getAllWithoutPagination(
      { chatRoom: { id: room.id } },
      { sender: true },
    );
    return data;
  }
}
