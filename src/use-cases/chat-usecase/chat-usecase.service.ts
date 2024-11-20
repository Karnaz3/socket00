import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { AppClsStore, IInvestorClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatRoomModel } from 'src/core/models/chat-room.model.ts';
import { UserModel } from 'src/core/models/user.model';
import { ChatFactoryService } from './chat-factory.usecase.service';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class ChatUseCaseService {
  constructor(
    private readonly chatFactoryService: ChatFactoryService,
    private readonly dataService: IDataServices,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async createSingleChat(dto: ChatRoomDto): Promise<ChatRoomModel> {
    console.log('Initial DTO:', dto);
    // dto = JSON.parse(dto);
    const parsedDto = typeof dto === 'string' ? JSON.parse(dto) : dto;
    console.log('Is DTO an instance of ChatRoomDto:', parsedDto instanceof ChatRoomDto);
    console.log('DTO ID:', parsedDto?.id);
    console.log('DTO Name:', parsedDto?.name);
    console.log('DTO Receiver:', parsedDto?.reciever);

    console.log('in service');
    if (parsedDto.id) {
      console.log('in id');
      const sender = await this.dataService.user.getOne({ id: parsedDto.id });
      console.log('sender', sender);
      const reciever = await this.dataService.user.getOne({ id: parsedDto.reciever });
      console.log('reciever', reciever);
      const existingRoom = await this.checkForExistingPrivateChatRoom(sender, reciever);
      console.log('existingRoom', existingRoom);
      if (existingRoom) return existingRoom;
      const room = this.chatFactoryService.createRoomChat(parsedDto, sender, reciever);
      console.log('room', room);
      return await this.dataService.chatRoom.create(room);
    }

    console.log('out of id');
    // sender and reciever portion (for user section issues)
    const sender = this.cls.get<IInvestorClsData>('investorUser');
    const authenticatedUser = await this.dataService.user.getOne({ id: sender.id });
    const reciever = await this.dataService.user.getOne({ id: dto.reciever });
    // room creation and check for existing room (for room related issues)
    const existingRoom = await this.checkForExistingPrivateChatRoom(authenticatedUser, reciever);
    if (existingRoom) return existingRoom;
    const room = this.chatFactoryService.createRoomChat(dto, authenticatedUser, reciever);
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
    console.log('Logged in User:', loggedInUser);
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

  async checkForExistingPrivateChatRoom(authenticatedUser?: UserModel, reciever?: UserModel): Promise<ChatRoomModel> {
    console.log(authenticatedUser, reciever);
    const rooms = await this.dataService.chatRoom.getAllWithoutPagination({
      user: { id: authenticatedUser.id },
      isPrivate: true,
    });
    console.log(rooms);
    return rooms.find((room) => room.user.some((user) => user.id === reciever.id)) || null;
  }

  async getParticipantsSameRoomSocket(chatRoomId: number, loggedUser: number) {
    //check if logged user is present in the room that is being accessed
    let presentUser: boolean = false;
    const loggedInUser = await this.dataService.user.getOne({ id: loggedUser });
    console.log('Logged in User:', loggedInUser);
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
}
