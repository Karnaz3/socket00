import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { PrivateChatEventModule } from './chat/private-chat/private-chat.module';

@Module({
  imports: [DataServicesModule, PrivateChatEventModule],
  exports: [PrivateChatEventModule],
})
export class SocketEventModule {}
