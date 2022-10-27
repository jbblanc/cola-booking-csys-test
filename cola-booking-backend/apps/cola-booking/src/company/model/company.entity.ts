import { Entity, Column } from 'typeorm';
import { StandardEntityWithUuid } from '@colabooking/commons';

@Entity('company')
export class Company extends StandardEntityWithUuid {
  @Column({ name: 'name', length: 100, nullable: true })
  name: string;
}
