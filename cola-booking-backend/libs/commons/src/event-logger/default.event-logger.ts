import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { domain } from 'process';
import { Repository, DeepPartial } from 'typeorm';
import { Logger } from 'winston';
import { DomainEvent } from './domain-event.entity';

@Injectable()
export class DefaultEventLogger {
  private readonly logger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly rootLogger: Logger,
    @InjectRepository(DomainEvent)
    private readonly domainEventRepository: Repository<DomainEvent>,
  ) {
    this.logger = this.rootLogger.child({ origin: DefaultEventLogger.name });
  }

  async newDomainEvent(domainEvent: DeepPartial<DomainEvent>): Promise<DomainEvent> {
    if(!domainEvent) {
      this.logger.warn('Trying to log a domain event with no content');
    }
    try {
      this.logger.info(domainEvent.message, {
        domainEvent,
      });
      const entity = await this.domainEventRepository.create(domainEvent);
      await entity.save();
      return entity;
    } catch (error) {
      this.logger.error('Unable to log domain event for ' + domainEvent.domain + ' : ' + error.message, {
        errorStack: error.stack,
        event: JSON.stringify(domainEvent),
      });
    }
  }
}
