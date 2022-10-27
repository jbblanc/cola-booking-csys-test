import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultEventLogger } from './default.event-logger';
import { DomainEvent } from './domain-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DomainEvent])],
  controllers: [],
  providers: [DefaultEventLogger],
  exports: [DefaultEventLogger],
})
export class EventLoggerModule {}
