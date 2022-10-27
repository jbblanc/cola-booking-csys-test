import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BookReservationDto } from './dto/book-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './model/reservation.entity';
import { Between, Repository } from 'typeorm';
import { EntityStatus } from '@colabooking/commons';
import { DateTimeHelper } from '@colabooking/commons/helpers';
import { Account } from '../account/model/account.entity';
import { CompanyService } from '../company/company.service';
import { RoomService } from '../room/room.service';
import { ReservationEventLogger } from './reservation.event-logger';
import { MaxLength } from 'class-validator';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly eventLogger: ReservationEventLogger,
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
  ) {}

  async bookNewReservation(
    dto: BookReservationDto,
    ownerAccount: Account,
  ): Promise<Reservation> {
    const ownerCompany = await this.companyService.findOne(
      ownerAccount.companyId,
    );
    const room = await this.roomService.findOne(dto.roomId);
    if (
      !this.roomIsAccessibleForAccount(
        ownerAccount.companyId,
        room.companyId,
        new Date(dto.timeSlot),
      )
    ) {
      throw new ForbiddenException(
        'Reservation rejected - The associated room is not accessible to account',
      );
    }
    const isRoomAvailableForTimeSlot = await this.roomIsAvailableForCurrentTimeSlot(
      room.id,
      new Date(dto.timeSlot),
    );
    if (!isRoomAvailableForTimeSlot) {
      throw new ConflictException(
        'Reservation rejected - The associated room is already booked by someone else',
      );
    }
    const roomCompany = await this.companyService.findOne(room.companyId);
    const reservation = await this.reservationRepository.create({
      ...dto,
      ownerAccountId: ownerAccount.id,
      ownerDetails: {
        fullName:
          ownerAccount.profile.lastName + ', ' + ownerAccount.profile.firstName,
        company: ownerCompany?.name,
      },
      roomDetails: {
        code: room?.code,
        company: roomCompany.name,
      },
    });
    await reservation.save();
    this.eventLogger.newEvent(
      'New reservation booked',
      ownerAccount.id,
      reservation,
      null,
    );
    return reservation;
  }

  private roomIsAccessibleForAccount(
    accountCompanyId: string,
    roomCompanyId: string,
    day: Date,
  ): boolean {
    const colaDay: Date = new Date(process.env.COLA_DAY);
    if (day.getDate() === colaDay.getDate()) {
      return true;
    }
    return accountCompanyId === roomCompanyId;
  }

  private async roomIsAvailableForCurrentTimeSlot(
    roomId: string,
    day: Date,
  ): Promise<boolean> {
    const timeSlot: Date = DateTimeHelper.getHourStart(day);
    const reservation = await this.reservationRepository.findOne({
      where: {
        roomId,
        timeSlot,
        status: EntityStatus.ACTIVE,
      },
    });
    return reservation === null || reservation === undefined;
  }

  async findOne(id: string): Promise<Reservation> {
    return await this.reservationRepository.findOne(id);
  }

  async listAllActiveForRoomAndDay(
    roomId: string,
    day: Date,
  ): Promise<Reservation[]> {
    const rangeMin = DateTimeHelper.getDayStart(new Date(day));
    const rangeMax = DateTimeHelper.getDayEnd(new Date(day));
    const res = await this.reservationRepository.find({
      where: {
        roomId,
        timeSlot: Between(
          DateTimeHelper.formatAsUtcForPostgres(rangeMin),
          DateTimeHelper.formatAsUtcForPostgres(rangeMax),
        ),
        status: EntityStatus.ACTIVE,
      },
      order: {
        timeSlot: 'ASC',
      },
    });
    return res;
  }

  async listAllActiveForAccount(
    ownerAccountId: string,
  ): Promise<Reservation[]> {
    const res = await this.reservationRepository.find({
      where: {
        ownerAccountId,
        status: EntityStatus.ACTIVE,
      },
      order: {
        timeSlot: 'ASC',
      },
    });
    return res;
  }

  async listAllRoomIdsBookedForTimeSlot(timeSlot: Date): Promise<string[]> {
    const roomIds = await this.reservationRepository
      .createQueryBuilder('res')
      .where('res.timeSlot = :timeSlot', {
        timeSlot: timeSlot,
      })
      .andWhere('res.status = :status', {
        status: EntityStatus.ACTIVE,
      })
      .distinctOn(['res.roomId'])
      .orderBy('res.roomId')
      .getMany();
    return roomIds.map((r) => {
      return r.roomId;
    });
  }

  async cancelReservation(id: string, by: string): Promise<void> {
    await this.reservationRepository.update(id, {
      status: EntityStatus.CANCELLED,
      cancelledOn: new Date(),
    });
    this.eventLogger.newEvent('Reservation cancelled', by, null, {
      reservationId: id,
    });
  }

  async trash(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
