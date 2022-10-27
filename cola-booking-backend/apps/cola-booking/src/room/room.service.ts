import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './model/room.entity';
import { Repository } from 'typeorm';
import { EntityStatus } from '@colabooking/commons';
import { ReservationService } from '../reservation/reservation.service';
import { Account } from '../account/model/account.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @Inject(forwardRef(() => ReservationService))
    private readonly reservationService: ReservationService,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.create(dto);
    await room.save();
    return room;
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    await this.roomRepository.update(id, dto);
    return await this.findOne(id);
  }

  async findOne(id: string): Promise<Room> {
    return await this.roomRepository.findOne(id);
  }

  async listAllActive(): Promise<Room[]> {
    return await this.roomRepository.find({
      where: {
        status: EntityStatus.ACTIVE,
      },
      order: {
        code: 'ASC',
      },
    });
  }

  async listAllMyActiveRoomsForDay(day: Date, account: Account) {
    const colaDay: Date = new Date(process.env.COLA_DAY);
    return await this.roomRepository.find({
      where: {
        ...(day.getDate() !== colaDay.getDate() && {
          companyId: account.companyId,
        }),
        status: EntityStatus.ACTIVE,
      },
      order: {
        code: 'ASC',
      },
    });
  }

  async listAllActiveForCompany(companyId: string): Promise<Room[]> {
    return await this.roomRepository.find({
      where: {
        companyId,
        status: EntityStatus.ACTIVE,
      },
    });
  }

  async findAvailableRoomsForTimeSlot(
    timeSlot: Date,
    account: Account,
  ): Promise<Room[]> {
    const roomIdsBookedForTimeSlot: string[] =
      await this.reservationService.listAllRoomIdsBookedForTimeSlot(timeSlot);
    const myActiveRoomsForDay = await this.listAllMyActiveRoomsForDay(
      timeSlot,
      account,
    );
    return myActiveRoomsForDay.filter(
      (r) => !roomIdsBookedForTimeSlot.includes(r.id),
    );
  }

  async trash(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
