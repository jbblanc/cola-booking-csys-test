import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Account } from './model/account.entity';
import { AccountEventLogger } from './account.event-logger';
import { EventLoggerModule } from '../../../../libs/commons/src/event-logger/event-logger.module';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    EventLoggerModule,
    AuthModule,
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountEventLogger,
  ],
  exports: [AccountService],
})
export class AccountModule {}
