import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateCompanyDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;
}
