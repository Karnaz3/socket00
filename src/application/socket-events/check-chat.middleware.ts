// import { Logger } from '@nestjs/common';
// import { NextFunction } from 'express';
// import { ChatTypeEnum } from 'src/common/enums/chat-type.enum';
// import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
// import { IDataServices } from 'src/core/abstracts';
// import { ChatModel } from 'src/core/models/chat/chat.model';
// /*
// This middleware is used to check the user role
// and sets the flag isAdmin, isEventAdmin, isEventUser
// */

// export async function handlePrivateChat(dataService: IDataServices, socket: WsWithAuth, next: NextFunction) {
//   const logger = new Logger('Private Chat Middleware');
//   try {
//     if (socket.authPayload.isAdmin) {
//       return next();
//     }

//     let chat = await dataService.chat.getOneOrNull({
//       event: {
//         id: socket.authPayload.event.id,
//       },
//       type: ChatTypeEnum.PRIVATE_CHAT,
//       chatUser: { id: socket.authPayload.chatUser.id },
//     });

//     if (!chat) {
//       chat = await dataService.chat.create({
//         event: { id: socket.authPayload.event.id },
//         chatUser: { id: socket.authPayload.chatUser.id },
//         type: ChatTypeEnum.PRIVATE_CHAT,
//       } as ChatModel);
//     }

//     socket.authPayload.chat = chat;
//     next();
//   } catch (error) {
//     socket.emit('exception', error);
//     logger.error(new Error(error));
//     next(error);
//   }
// }
