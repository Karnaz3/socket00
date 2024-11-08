import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { ChatRoomDto } from 'src/core/dtos/request/chat.dto';
import { ChatUseCaseService } from 'src/use-cases/chat-usecase/chat-usecase.service';

@Controller('single-chat')
export class ChatController {
  constructor(private readonly useCaseService: ChatUseCaseService) {}
  @Post('/create-room')
  async createRoomChat(@Body() dto: ChatRoomDto) {
    return CoreApiResponse.success(await this.useCaseService.createSingleChat(dto));
  }

  @Get('/get-rooms')
  async getRooms() {
    return CoreApiResponse.success(await this.useCaseService.getCreatedChatRooms());
  }
}
