// import { Injectable } from '@nestjs/common';
// import { IDataServices } from 'src/core/abstracts';
// import { SendChatMessageDto, SendChatSupporterMessageDto } from 'src/core/dtos/request/chat/send-chat-message.dto';
// import { ChatUsersModel } from 'src/core/models/chat/chat-users.model';
// import { ChatModel } from 'src/core/models/chat/chat.model';
// import { createMessage } from '../helper/chat-helper';
// import { WsAppException } from 'src/application/exception/ws-exceptions';
// @Injectable()
// export class PrivateChatGateWayService {
//   constructor(
//     private readonly dataService: IDataServices, // private readonly transformerService: IClassTransformer,
//   ) {}

//   async sendEventUserMessage(dto: SendChatMessageDto, chat: ChatModel, sender: ChatUsersModel) {
//     const messageModel = createMessage(dto, chat, sender);
//     const message = await this.dataService.message.create(messageModel);
//     // const data = this.transformerService.objectToModal<ChatMessageResponseDto>(ChatMessageResponseDto, message, {
//     //   excludeExtraneousValues: true,
//     // });
//     return message;
//   }

//   async sendAdminMessage(dto: SendChatSupporterMessageDto, sender: ChatUsersModel) {
//     if (!sender.admin) {
//       throw new WsAppException('User is not authorized to send message');
//     }

//     const chat = await this.dataService.message.findOrCreate(
//       {
//         chatUser: { id: dto.receiverChatUserId },
//       } as ChatModel,
//       {
//         chatUser: { id: dto.receiverChatUserId },
//       } as ChatModel,
//     );

//     // createing receiver model
//     const receiver = new ChatUsersModel();
//     receiver.id = dto.receiverChatUserId;
//     const messageModel = createMessage(dto, chat, sender, receiver);
//     const message = await this.dataService.message.create(messageModel);
//     return message;
//   }
//   //   return this.transformerService.objectToModal<ChatMessageResponseDto>(ChatMessageResponseDto, message, {
//   //     excludeExtraneousValues: true,
//   //   });
//   // }
// }
