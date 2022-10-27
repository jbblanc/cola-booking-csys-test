import { DefaultBaseEntity } from './default-base.entity';
import { v4 as uuid } from 'uuid';
import { PrimaryColumn } from 'typeorm';

export class StandardEntityWithUuid extends DefaultBaseEntity {
  @PrimaryColumn({ name: 'id', length: 36 /* uuid v4 max length */ })
  id: string = uuid();
}
