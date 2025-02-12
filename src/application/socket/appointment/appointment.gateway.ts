import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import AppException from 'src/application/exception/app.exception';
import { AppointmentEventConstant, NamespaceConstants } from 'src/common/type/socket-constants/namespace.constant';
import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
import { IDataServices } from 'src/core/abstracts';
import { MessageDto } from 'src/core/dtos/request/chat.dto';
import { MessageModel } from 'src/core/models/message.model';

@WebSocketGateway({
  namespace: `/${NamespaceConstants.appointment}`, // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class AppointmentChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(AppointmentChatGateway.name);

  constructor(private readonly dataService: IDataServices) {}
  handleDisconnect(client: any) {
    const userId = client.jwtPayload?.id;
    if (userId) {
      this.logger.log(`User disconnected: ${client.id}`);
      // Perform any cleanup or state update necessary for the disconnected user
    } else {
      this.logger.warn(`User disconnected: ${client.id} with missing JWT payload.`);
    }
  }

  async handleConnection(client: WsWithAuth) {
    try {
      await this.checkForValidation(client);
      // If no error is thrown, validation passed.
      client.join(client.authPayload.appointment.id.toString());
    } catch (error) {
      // Validation failed; disconnect the client.
      client.disconnect();
      // Optionally, log the error here.
    }
  }

  async checkForValidation(client: WsWithAuth): Promise<void> {
    // Check for valid user in space
    const data = await this.dataService.appointment.getOne({
      id: client.authPayload.appointment.id,
      user: client.authPayload.user,
    });
    if (!data) {
      throw new AppException('User not allowed in this space');
    }
    // No return needed; if the function completes, validation passed.
  }

  @SubscribeMessage(AppointmentEventConstant.message)
  async handleMessage(client: WsWithAuth, payload: MessageDto) {
    const message = new MessageModel();
    message.appointment = client.authPayload.appointment;
    message.content = payload.content;
    message.sender = client.authPayload.user;
    const data = await this.dataService.message.create(message);

    this.namespace.to(client.authPayload.appointment.id.toString()).emit(AppointmentEventConstant.message, {
      message: data.content,
    });
  }
}
