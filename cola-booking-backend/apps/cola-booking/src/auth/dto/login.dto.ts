import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @ApiProperty()
  email: string;

  @IsDefined()
  @ApiProperty()
  password: string;
}
