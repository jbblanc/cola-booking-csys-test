import { forwardRef, Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './model/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../account';
import { CompanyModule } from '../company/company.module';
import { RoomModule } from '../room/room.module';
import { EventLoggerModule } from '@colabooking/commons/event-logger';
import { ReservationEventLogger } from './reservation.event-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    AuthModule,
    AccountModule,
    EventLoggerModule,
    CompanyModule,
    forwardRef(() => RoomModule),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationEventLogger],
  exports: [ReservationService],
})
export class ReservationModule {}
