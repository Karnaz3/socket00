import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { Server, ServerOptions } from 'socket.io';
import { extractQueryParams, extractTokenFromHeader } from 'src/common/helpers/extract-token';
import { NamespaceConstants } from 'src/common/type/socket-constants/namespace.constant';
import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
import { IDataServices } from 'src/core/abstracts';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  constructor(private readonly app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const jwtService = this.app.get(IJwtService);
    const dataServices = this.app.get(IDataServices);
    const cors = {
      origin: '*',
    };

    const server: Server = super.createIOServer(port, { ...options, cors });
    // http://localhost:8080/appointment?appointment=123
    /**
     * appointment has user(doc,patient)
     */
    server.of(NamespaceConstants.appointment).use(createAuthMiddleware(jwtService, dataServices));

    return server;
  }
}

/* 
This middleware is used to authenticate the user through JWT token
and sets the authPayload and jwtPayload on the socket object
*/
const createAuthMiddleware =
  (jwtService: IJwtService, dataServices: IDataServices) => async (socket: WsWithAuth, next: NextFunction) => {
    const logger = new Logger('Ws AuthMiddleware');
    try {
      const token = extractTokenFromHeader(socket);
      const query = extractQueryParams(socket);
      console.log('query is ', query);
      if (!token) {
        throw 'Unauthorized';
      }

      const payload = await jwtService.checkToken<{ sub: string }>(token);

      console.log('payload is ', payload);

      if (!payload) {
        throw 'Unauthorized';
      }

      /**
       * checking if the event id is present in the query of the socket
       */
      if (!query.appointment) {
        throw 'Appointment Id is required';
      }

      const user = await dataServices.user.getOne({
        email: payload.sub,
      });

      const appointment = await dataServices.appointment.getOne({ id: query.appointment });
      socket.authPayload = {
        appointment,
        user,
        isDoctor: user.isAdmin,
      };

      next();
    } catch (error) {
      logger.error(error);
      return next(new Error('Unauthorized'));
    }
  };
