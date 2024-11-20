// import { ChatTypeEnum } from 'src/common/enums/chat-type.enum';
// import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
// import { IDataServices } from 'src/core/abstracts';
// import { AdminModel } from 'src/core/models';
// import { ChatModel } from 'src/core/models/chat/chat.model';
// import { ChatMessageModel } from 'src/core/models/chat/message.model';
// import { EventModel } from 'src/core/models/event/event.model';
// import { EventModeratorModel } from 'src/core/models/event/user/event-moderator.model';
// import { EventUserModel } from 'src/core/models/event/user/event-user.model';
// import { EventUserEntity } from 'src/frameworks/data-services/pg/entities/event/event-user.entity';

// export async function findOrCreateChat(
//   dataServices: IDataServices,
//   dto: { eventId: string; type: ChatTypeEnum; user?: ChatUsersModel },
// ) {
//   let chat = await dataServices.chat.getOneOrNull({
//     event: {
//       id: dto.eventId,
//     },
//     type: dto.type,
//   });

//   if (!chat) {
//     const chatModel = new ChatModel();
//     chatModel.type = dto.type;
//     chatModel.chatUser = dto.user;
//     chatModel.event = { id: dto.eventId } as EventModel;
//     chat = await dataServices.chat.create(chatModel);
//   }
//   return chat;
// }

// export function getUser(
//   socket: WsWithAuth,
// ): AdminModel | EventModeratorModel | EventUserModel | EventUserEntity | undefined | null {
//   if (socket.authPayload.isAdmin) {
//     return socket.authPayload.adminUser as AdminModel;
//   } else if (socket.authPayload.isEventAdmin) {
//     return socket.authPayload.eventAdminUser as EventModeratorModel;
//   } else if (socket.authPayload.isEventUser) {
//     return socket.authPayload.eventUser as EventUserModel;
//   }
// }

// export function getChatUser(socket: WsWithAuth): ChatUsersModel | undefined {
//   return socket.authPayload.eventUser;
// }

// export function createMessage(dto: any, chat: ChatModel, chatUser: ChatUsersModel, receiver?: ChatUsersModel): any {
//   const message = new ChatMessageModel();
//   message.chat = chat;
//   message.sender = chatUser;
//   message.content = dto.content;
//   if (receiver) {
//     message.receiver = receiver;
//   }
//   return message;
// }

// export function getUserFromMessage(message: ChatMessageModel): { id: string } {
//   if (message.sender?.admin) {
//     return { id: message.sender.admin.id };
//   }

//   if (message.sender?.eventUser) {
//     return { id: message.sender.eventUser.id };
//   }
//   return { id: '' };
// }
