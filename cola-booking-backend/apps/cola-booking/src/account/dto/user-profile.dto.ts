import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Gender } from '../model/gender.enum';

export class UserProfileDto {

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Le nom est trop long',
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Le prénom est trop long',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  @MaxLength(320, {
    message: 'L\'email est trop long',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(320, {
    message: 'L\'url avatar est trop longue',
  })
  avatarUrl?: string;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Le poste est trop long',
  })
  jobPosition?: string;
}