import { Entity, Column } from 'typeorm';
import { StandardEntityWithUuid } from '@colabooking/commons';

@Entity('room')
export class Room extends StandardEntityWithUuid {
  @Column({ name: 'code', length: 20, nullable: true })
  code: string;

  @Column({ name: 'companyId', length: 50, nullable: false })
  companyId: string;

  @Column({ name: 'floor', length: 20, nullable: true })
  floor?: string;
}
