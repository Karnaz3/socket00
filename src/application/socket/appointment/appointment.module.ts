import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AppointmentChatGateway } from './appointment.gateway';

@Module({
  imports: [DataServicesModule],
  providers: [AppointmentChatGateway],
  exports: [AppointmentChatGateway],
})
export class AppointmentChatModule {}
