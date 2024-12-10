import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { MessageUseCaseService } from 'src/use-cases/message-usecase/message-usecase.service';

@Controller('messages')
export class PrivateMessageController {
  constructor(private readonly useCaseService: MessageUseCaseService) {}

  @Post('send-message')
  async sendMessage(@Body() dto: MessageDto) {
    return CoreApiResponse.success(await this.useCaseService.createMessage(dto));
  }

  @Get('public-messages')
  async getPublicMessages() {
    return CoreApiResponse.success(await this.useCaseService.getMessagesPublic());
  }

  @Get('private-messages/:chatroomId')
  async getMessages(@Param('chatroomId') chatroomId: number) {
    return CoreApiResponse.success(await this.useCaseService.getMessages(chatroomId));
  }
}
