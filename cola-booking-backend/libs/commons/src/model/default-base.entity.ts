import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityStatus } from './entity-status.enum';

export class DefaultBaseEntity extends BaseEntity {
  @CreateDateColumn({ name: 'createdOn', nullable: false })
  createdOn: Date;

  @UpdateDateColumn({ name: 'lastModifiedOn', nullable: true })
  lastModifiedOn: Date;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false,
  })
  status = EntityStatus.ACTIVE;
}
