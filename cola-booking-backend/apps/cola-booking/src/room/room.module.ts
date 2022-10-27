import { forwardRef, Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './model/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../account';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule, AccountModule, forwardRef(() => ReservationModule)],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
