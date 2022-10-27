import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  floor?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  companyId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  code?: string;
}
