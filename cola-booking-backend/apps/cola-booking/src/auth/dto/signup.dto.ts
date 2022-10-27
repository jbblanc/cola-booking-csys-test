import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsIn,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { IsEmail } from 'class-validator';

export class SignupDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  companyId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  jobPosition?: string;

  @IsDefined()
  @IsBoolean()
  @IsIn([true])
  @ApiProperty()
  hasAcceptedTerms: boolean;

  @IsDefined()
  @IsBoolean()
  @IsIn([true])
  @ApiProperty()
  hasConsentedDataProcessing: boolean;
}
