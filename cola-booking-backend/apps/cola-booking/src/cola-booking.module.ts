import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { eventLoggerConfig } from '../config/logger-event.config';
import { MonitoringController } from './monitoring.controller';
import { AccountModule } from './account/account.module';
import { WinstonModule } from 'nest-winston';
import { CompanyModule } from './company/company.module';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(eventLoggerConfig),
    AccountModule,
    CompanyModule,
    RoomModule,
    ReservationModule,
  ],
  controllers: [MonitoringController],
  providers: [],
})
export class ColaBookingModule {}
