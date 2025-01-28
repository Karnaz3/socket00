import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { AppointmentEventConstant, NamespaceConstants } from 'src/common/type/socket-constants/namespace.constant';
import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
import { MessageDto } from 'src/core/dtos/request/chat.dto';

@WebSocketGateway({
  namespace: `/${NamespaceConstants.appointment}`, // The namespace
  transport: ['websocket'], // Use WebSocket as the transport
})
export class AppointmentChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() namespace: Namespace;
  private readonly logger = new Logger(AppointmentChatGateway.name);

  constructor() {}
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
    // join the user to the appointment room
    client.join(client.authPayload.appointment.id.toString()); // 123 room doc and patient are connected
  }

  @SubscribeMessage(AppointmentEventConstant.message)
  async handleMessage(client: WsWithAuth, payload: MessageDto) {
    // create the message and save it to db and send it to the appointment room
    this.namespace.to(client.authPayload.appointment.id.toString()).emit(AppointmentEventConstant.message, payload);
  }
}
