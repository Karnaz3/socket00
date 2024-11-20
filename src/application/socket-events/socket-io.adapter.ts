import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { Server, ServerOptions } from 'socket.io';
import { extractTokenFromHeader } from 'src/common/helpers/extract-token';
import { WsWithAuth } from 'src/common/type/socket-constants/socket-with-auth';
import { IDataServices } from 'src/core/abstracts';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import AppException from '../exception/app.exception';

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

    /**
     * check code fo logging
    //  */
    // server.on('connection', (socket) => {
    //   this.logger.log(`Client connected: ${socket.id}`);
    //   console.log('Socket Object:', socket);
    //   socket.on('disconnect', () => {
    //     console.log('disconnected:', socket);
    //     this.logger.log(`Client disconnected: ${socket.id}`);
    //   });
    // });

    // chat middleware
    server.of('/message-private-chat').use(createAuthMiddleware(jwtService, dataServices)); // sets the authPayload and jwtPayload on the socket object

    return server;
  }
}

const createAuthMiddleware =
  (jwtService: IJwtService, dataServices: IDataServices) => async (socket: WsWithAuth, next: NextFunction) => {
    const logger = new Logger('SocketMiddleware');
    try {
      const token = extractTokenFromHeader(socket);
      if (!token) {
        throw new AppException('Unauthorized', 'Unauthorized', 401);
      }

      const payload = await jwtService.checkToken(token);
      if (!payload) {
        throw new AppException('Unauthorized', 'Unauthorized', 401);
      }

      const user = await dataServices.user.getOne({ email: (payload as any)?.sub });
      if (!user) {
        throw new AppException('Unauthorized', 'Unauthorized', 401);
      }

      (payload as any).id = user.id;
      socket.jwtPayload = payload as any;
      console.log('jwtpayload', socket.jwtPayload);

      next();
    } catch (err) {
      logger.error(err.message);
      return next(new AppException('Unauthorized', 'Unauthorized', 401));
    }
  };
