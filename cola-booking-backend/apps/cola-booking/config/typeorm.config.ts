import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DomainEvent } from '@colabooking/commons/event-logger/domain-event.entity';
import { Account } from '../src/account/model/account.entity';
import { Company } from '../src/company/model/company.entity';
import { Room } from '../src/room/model/room.entity';
import { Reservation } from '../src/reservation/model/reservation.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  entities: [Account, DomainEvent, Company, Room, Reservation],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
};
