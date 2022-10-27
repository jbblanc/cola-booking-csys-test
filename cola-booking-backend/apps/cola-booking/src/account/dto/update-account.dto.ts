import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { AccountRole } from '../model/account-role.enum';
import { UserProfileDto } from './user-profile.dto';
export class UpdateAccountDto {

  @IsOptional()
  @IsArray()
  roles: AccountRole[];

  @IsOptional()
  profile: UserProfileDto;
}