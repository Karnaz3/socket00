import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import AppException from 'src/application/exception/app.exception';
import { AppClsStore, IInvestorClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { UserModel } from 'src/core/models/user.model';
import { ChatFactoryService } from './chat-factory.usecase.service';

@Injectable()
export class ChatUseCaseService {
  constructor(
    private readonly chatFactoryService: ChatFactoryService,
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createSingleChat(dto: ChatRoomDto): Promise<ChatRoomModel> {
    // dto = JSON.parse(dto);
    const parsedDto = typeof dto === 'string' ? JSON.parse(dto) : dto;

    if (parsedDto.id) {
      const sender = await this.dataService.user.getOne({ id: parsedDto.id });
      const receiver = await this.dataService.user.getOne({ id: parsedDto.receiver });
      const existingRoom = await this.checkForExistingPrivateChatRoom(sender, receiver);
      if (existingRoom) return existingRoom;
      const room = this.chatFactoryService.createRoomChat(parsedDto, sender, receiver);
      return await this.dataService.chatRoom.create(room);
    }

    // sender and receiver portion (for user section issues)
    const sender = this.cls.get<IInvestorClsData>('investorUser');
    const authenticatedUser = await this.dataService.user.getOne({ id: sender.id });
    const receiver = await this.dataService.user.getOne({ id: dto.receiver });
    // room creation and check for existing room (for room related issues)
    const existingRoom = await this.checkForExistingPrivateChatRoom(authenticatedUser, receiver);
    if (existingRoom) return existingRoom;
    const room = this.chatFactoryService.createRoomChat(dto, authenticatedUser, receiver);
    return await this.dataService.chatRoom.create(room);
  }

  async getCreatedChatRooms() {
    const loggedInUser = this.cls.get<IInvestorClsData>('investorUser');
    return await this.dataService.chatRoom.getAllWithoutPagination({ user: { id: loggedInUser.id } });
  }

  async getParticipantsSameRoom(chatRoomId: number) {
    //check if logged user is present in the room that is being accessed
    let presentUser: boolean = false;
    const loggedInUser = this.cls.get<IInvestorClsData>('investorUser');
    if (!loggedInUser) throw new AppException({}, 'Unauthorized access', 401);
    const room = await this.dataService.chatRoom.getOne({ id: chatRoomId });
    room.user.forEach((user) => {
      if (user.id === loggedInUser.id) {
        presentUser = true;
      }
    });
    if (presentUser === false) throw new AppException({}, 'Unauthorized access', 401);
    return room;
  }

  async checkForExistingPrivateChatRoom(authenticatedUser?: UserModel, receiver?: UserModel): Promise<ChatRoomModel> {
    console.log(authenticatedUser, receiver);
    const rooms = await this.dataService.chatRoom.getAllWithoutPagination({
      user: { id: authenticatedUser.id },
      isPrivate: true,
    });
    return rooms.find((room) => room.user.some((user) => user.id === receiver.id)) || null;
  }

  async getParticipantsSameRoomSocket(chatRoomId: number, loggedUser: number) {
    //check if logged user is present in the room that is being accessed
    let presentUser: boolean = false;
    const loggedInUser = await this.dataService.user.getOne({ id: loggedUser });
    if (!loggedInUser) throw new AppException({}, 'Unauthorized access', 401);
    const room = await this.dataService.chatRoom.getOne({ id: chatRoomId });
    room.user.forEach((user) => {
      if (user.id === loggedInUser.id) {
        presentUser = true;
      }
    });
    if (presentUser === false) throw new AppException({}, 'Unauthorized access', 401);
    return room;
  }

  // public chat
  //check for existing global chat room
  async checkForExistingGlobalChatRoom(): Promise<boolean> {
    const room = await this.dataService.chatRoom.getOneOrNull({ isPrivate: false });
    return !!room; // Return true if room exists, false otherwise
  }

  async getGlobalChatRoom() {
    const existingRoom = await this.dataService.chatRoom.getOneOrNull({ isPrivate: false });

    if (!existingRoom) {
      // Create a new global room if none exists
      const newRoom = this.chatFactoryService.createRoomChatPublic();
      return await this.dataService.chatRoom.create(newRoom);
    }

    // Return the existing room with optional relations (e.g., messages)
    return await this.dataService.chatRoom.getOne({ id: existingRoom.id }, { message: true });
  }
}
