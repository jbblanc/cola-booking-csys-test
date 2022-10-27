import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { BookReservationDto } from './dto/book-reservation.dto';

import { Reservation } from './model/reservation.entity';
import { AuthGuard } from '../auth';
import { ReservationPermissionsGuard } from './reservation-permissions.guard';
import { Permission, Permissions } from '../commons/permissions';
import { GetAccount } from '../account/get-account.decorator';
import { Account } from '../account/model/account.entity';


@ApiTags('Reservations')
@Controller('api/v1/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_BOOK)
  @Post()
  async book(
    @Body() dto: BookReservationDto,
    @GetAccount() by: Account,
  ): Promise<Reservation> {
    return await this.reservationService.bookNewReservation(dto, by);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_CANCEL)//TODO forbid cancellation if not owner
  @Patch(':id/cancel')
  async update(
    @Param('id') id: string,
    @GetAccount() by: Account,
  ): Promise<void> {
    await this.reservationService.cancelReservation(id, by.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_GET)
  @Get('search')
  async listAllActiveForRoomAndDay(
    @Query('roomId') roomId: string,
    @Query('day') day: Date,
  ): Promise<Reservation[]> {
    return await this.reservationService.listAllActiveForRoomAndDay(
      roomId,
      new Date(day),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_GET)
  @Get('mine')
  async listAllActiveForAccount(
    @GetAccount() account: Account,
  ): Promise<Reservation[]> {
    return await this.reservationService.listAllActiveForAccount(
      account.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_GET)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return await this.reservationService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ReservationPermissionsGuard)
  @Permissions(Permission.RESERVATION_TRASH)
  @Delete(':id/trash')
  async trash(@Param('id') id: string): Promise<void> {
    return this.reservationService.trash(id);
  }
}
