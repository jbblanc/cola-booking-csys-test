import { Entity, Column } from 'typeorm';
import { StandardEntityWithUuid } from '@colabooking/commons';
import { OwnerDetails } from './owner-details.interface';
import { RoomDetails } from './room-details.interface';

@Entity('reservation')
export class Reservation extends StandardEntityWithUuid {
  @Column({ name: 'timeSlot', nullable: false })
  timeSlot: Date;// start time + reservation day

  @Column({ name: 'durationInMin', nullable: false })
  durationInMin: number = 60;

  @Column({ name: 'roomId', length: 50, nullable: false })
  roomId: string;

  @Column({ name: 'roomDetails', type: 'simple-json', nullable: true })
  roomDetails: RoomDetails;

  @Column({ name: 'ownerAccountId', length: 50, nullable: false })
  ownerAccountId: string;

  @Column({ name: 'ownerDetails', type: 'simple-json', nullable: true })
  ownerDetails: OwnerDetails;

  @Column({ name: 'cancelledOn', nullable: true })
  cancelledOn: Date;
}
