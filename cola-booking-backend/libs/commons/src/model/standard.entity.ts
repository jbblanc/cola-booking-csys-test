import { DefaultBaseEntity } from './default-base.entity';
import { v4 as uuid } from 'uuid';
import { PrimaryColumn } from 'typeorm';

export class StandardEntity extends DefaultBaseEntity {
  @PrimaryColumn({ name: 'id', length: 50 })
  id: string = uuid();
}
