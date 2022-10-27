import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsOptional,
  IsDate,
  IsDateString,
} from 'class-validator';
export class BookReservationDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  roomId: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  timeSlot: Date;
}
