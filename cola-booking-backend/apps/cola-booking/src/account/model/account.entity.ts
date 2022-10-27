import { Entity, Column } from 'typeorm';
import { StandardEntityWithUuid } from '@colabooking/commons';
import { AccountRole } from './account-role.enum';
import { UserProfile } from './user-profile.embedded.entity';
import { Credentials } from './credentials.embedded.entity';

@Entity('account')
export class Account extends StandardEntityWithUuid {
  @Column({ name: 'roles', type: 'simple-array' })
  roles: AccountRole[] = [AccountRole.GUEST];

  //TODO add foreign key in migration file ?
  //admins can be without company association
  @Column({ name: 'companyId', length: 100, nullable: true })
  companyId: string;

  @Column(() => UserProfile, {
    prefix: false,
  })
  profile: UserProfile;

  @Column(() => Credentials, {
    prefix: true,
  })
  credentials: Credentials;

  @Column({ name: 'hasAcceptedTerms', type: 'boolean' })
  hasAcceptedTerms = false;

  @Column({ name: 'hasConsentedDataProcessing', type: 'boolean' })
  hasConsentedDataProcessing = false;
}
