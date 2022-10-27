import { DefaultEventLogger } from '@colabooking/commons/event-logger';
import { Injectable } from '@nestjs/common';
import { Reservation } from './model/reservation.entity';

@Injectable()
export class ReservationEventLogger {

  private readonly domain: string = "reservation";

  constructor(
    private readonly defaultEventLogger: DefaultEventLogger,
  ) {}

  async newEventBasic(message: string, by: string, itemId: string, context: any): Promise<void> {
    await this.defaultEventLogger.newDomainEvent({
      domain: this.domain,
      itemType: "reservation",
      itemId,
      performedByAccountId: by,
      message,
      context,
    });
  }
  async newEvent(message: string, by: string, reservation: Reservation, context: any): Promise<void> {
    context = {
      ...context,
    }
    await this.defaultEventLogger.newDomainEvent({
      domain: this.domain,
      itemType: "reservation",
      itemId: reservation ? reservation.id: null,
      performedByAccountId: by,
      message,
      context,
    });
  }

}