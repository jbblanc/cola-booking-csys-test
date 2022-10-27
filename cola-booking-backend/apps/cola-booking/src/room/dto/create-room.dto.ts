import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsOptional } from 'class-validator';
export class CreateRoomDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  code: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  companyId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  floor?: string;
}
