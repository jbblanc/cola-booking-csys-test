import { Column } from 'typeorm';
import { Gender } from './gender.enum';

export class UserProfile {
  // ######################
  // WARNING => GDPR/RGPD sensitive data here
  // ######################

  @Column({ name: 'lastName', length: 100, nullable: true })
  lastName?: string;

  @Column({ name: 'firstName', length: 100, nullable: true })
  firstName?: string;

  @Column({ name: 'email', length: 320, nullable: true })
  email?: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  gender: Gender = Gender.UNDEFINED;

  @Column({ name: 'avatarUrl', length: 320, nullable: true })
  avatarUrl?: string;

  @Column({ name: 'jobPosition', length: 100, nullable: true })
  jobPosition?: string;
}
