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
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

import { Room } from './model/room.entity';
import { AuthGuard } from '../auth';
import { RoomPermissionsGuard } from './room-permissions.guard';
import { Permission, Permissions } from '../commons/permissions';
import { GetAccount } from '../account/get-account.decorator';
import { Account } from '../account/model/account.entity';

@ApiTags('Rooms')
@Controller('api/v1/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_CREATE)
  @Post()
  async create(@Body() dto: CreateRoomDto): Promise<Room> {
    return await this.roomService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_UPDATE)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoomDto,
  ): Promise<Room> {
    return await this.roomService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_GET_MINE)
  @Get('search')
  async searchRooms(
    @Query('companyId') companyId: string,
    @Query('availableForTimeSlot') timeSlot: Date,
    @GetAccount() account: Account,
  ): Promise<Room[]> {
    if (timeSlot) {
      return await this.roomService.findAvailableRoomsForTimeSlot(
        new Date(timeSlot),
        account,
      );
    } else if (companyId) {
      return await this.roomService.listAllActiveForCompany(companyId);
    }
    return [];
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_GET_MINE)
  @Get('mine')
  async listAllMyRooms(
    @Query('day') day: Date,
    @GetAccount() account: Account,
  ): Promise<Room[]> {
    if (!day) {
      throw new BadRequestException(
        'You must specify a day when requesting your rooms list',
      );
    }
    return await this.roomService.listAllMyActiveRoomsForDay(
      new Date(day),
      account,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_GET_ONE)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Room> {
    return await this.roomService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_GET_ALL)
  @Get()
  async listAllActive(): Promise<Room[]> {
    return await this.roomService.listAllActive();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoomPermissionsGuard)
  @Permissions(Permission.ROOM_TRASH)
  @Delete(':id/trash')
  async trash(@Param('id') id: string): Promise<void> {
    return this.roomService.trash(id);
  }
}
