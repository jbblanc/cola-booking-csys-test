import { Column, Entity } from "typeorm";
import { StandardEntityWithUuid } from "../model";

@Entity('domain_event')
export class DomainEvent extends StandardEntityWithUuid  {

  // when
  @Column({ name: 'occurredOn', nullable: false })
  occurredOn: Date = new Date();

  // by
  @Column({ name: 'performedByAccountId', length: 100, nullable: true })
  performedByAccountId: string;

  // what
  @Column({ name: 'message', length: 200, nullable: true })
  message: string;

  // domain details
  @Column({ name: 'domain', length: 50, nullable: true })
  domain: string;

  @Column({ name: 'itemId', length: 100, nullable: true })
  itemId: string;

  @Column({ name: 'itemType', length: 50, nullable: true })
  itemType: string;

  @Column({ name: 'context', type: 'jsonb', nullable: true })
  context: any;

}