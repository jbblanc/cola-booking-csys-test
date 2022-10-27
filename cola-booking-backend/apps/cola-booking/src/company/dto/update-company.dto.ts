import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;
}
