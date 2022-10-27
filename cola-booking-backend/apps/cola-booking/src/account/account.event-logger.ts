import { DefaultEventLogger } from '@colabooking/commons/event-logger';
import { Injectable } from '@nestjs/common';
import { Account } from './model/account.entity';

@Injectable()
export class AccountEventLogger {

  private readonly domain: string = "account";

  constructor(
    private readonly defaultEventLogger: DefaultEventLogger,
  ) {}

  async newEventBasic(message: string, by: string, itemId: string, context: any): Promise<void> {
    await this.defaultEventLogger.newDomainEvent({
      domain: this.domain,
      itemType: "account",
      itemId,
      performedByAccountId: by,
      message,
      context,
    });
  }
  async newEvent(message: string, by: string, account: Account, context: any): Promise<void> {
    context = {
      ...context,
    }
    await this.defaultEventLogger.newDomainEvent({
      domain: this.domain,
      itemType: "account",
      itemId: account ? account.id: null,
      performedByAccountId: by,
      message,
      context,
    });
  }

}