import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect, assert } from 'chai';

import { ReservationScenarioContext } from '../../helpers/reservation/reservation-scenario-context';
import {
  reservations_book,
  reservations_cancel,
  reservations_getOne,
  reservations_trashOne,
} from '../../helpers/reservation/reservation';
import { Reservation } from '../../../src/reservation/model/reservation.entity';
import { StaticContext } from '../../helpers/static-context';
import { EntityStatus } from '../../../../../libs/commons/src/model/entity-status.enum';
import { rooms_getOneFromCode } from '../../helpers/room/room';
import { AccountPool } from '../../helpers/account-pool';

@binding([ReservationScenarioContext, AccountPool])
export class ReservationSteps {
  constructor(
    protected reservationScenario: ReservationScenarioContext,
    protected accountPool: AccountPool,
  ) {}

  @after('@reservation')
  public async runsAfterEachScenarioLastStep() {
    // purging all resources created during the test
    StaticContext.loggedAccount =
      await this.accountPool.accountFromRoleAndCompany('admin');
    for (let id of this.reservationScenario.reservationIdsToTrash) {
      await reservations_trashOne(
        id,
        StaticContext.loggedAccount.auth.access_token,
      );
    }
  }

  @given(/I select Cola Day in calendar/, '@reservation')
  public async selectColaDayInCalendar() {
    this.reservationScenario.selectedCalendarDay = new Date(
      process.env.COLA_DAY,
    );
  }

  @given(/Room ([^"]*) is already booked/)
  public async createNewReservationAsSetup(roomCode: string) {
    const room = await this.getAnyRoomFromCodeAsAdmin(roomCode);
    this.reservationScenario.bookReservationDto = {
      roomId: room.id,
      timeSlot: this.reservationScenario.selectedCalendarDay,
    };
    const reservation: Reservation = await reservations_book(
      this.reservationScenario.bookReservationDto,
      await (
        await this.accountPool.accountFromRoleAndCompany('employeeb-pepsi')
      ).auth.access_token,
    );
    this.reservationScenario.reservationIdsToTrash.push(reservation.id);
  }

  @when(/I book a new reservation for room ([^"]*)/)
  public async createNewReservation(roomCode: string) {
    const room = await this.getAnyRoomFromCodeAsAdmin(roomCode);
    this.reservationScenario.bookReservationDto = {
      roomId: room.id,
      timeSlot: this.reservationScenario.selectedCalendarDay,
    };
    const reservation: Reservation = await reservations_book(
      this.reservationScenario.bookReservationDto,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.reservationScenario.reservationResource = reservation;
    this.reservationScenario.reservationIdsToTrash.push(reservation.id);
    expect(reservation).to.be.not.null;
    expect(reservation.id).to.be.not.null;
    expect(reservation.createdOn).to.be.not.null;
    expect(reservation.status).to.equal(EntityStatus.ACTIVE);
    expect(reservation.roomId).to.equal(
      this.reservationScenario.bookReservationDto.roomId,
    );
  }

  @when(/I book a new reservation for competitor room ([^"]*)/)
  public async createNewReservationOnCompetitorRoom(roomCode: string) {
    const room = await this.getAnyRoomFromCodeAsAdmin(roomCode);
    this.reservationScenario.bookReservationDto = {
      roomId: room.id,
      timeSlot: this.reservationScenario.selectedCalendarDay,
    };
    try {
      const reservation: Reservation = await reservations_book(
        this.reservationScenario.bookReservationDto,
        StaticContext.loggedAccount.auth.access_token,
      );
      this.reservationScenario.reservationResource = reservation;
      this.reservationScenario.reservationIdsToTrash.push(reservation.id);
      expect(reservation).to.be.not.null;
      expect(reservation.id).to.be.not.null;
      expect(reservation.createdOn).to.be.not.null;
      expect(reservation.status).to.equal(EntityStatus.ACTIVE);
      expect(reservation.roomId).to.equal(
        this.reservationScenario.bookReservationDto.roomId,
      );
    } catch (e) {
      this.reservationScenario.reservationHasBeenRejected = true;
    }
  }

  @when(/I book a new reservation for already booked room ([^"]*)/)
  public async createNewReservationOnAlreadyBookedRoom(roomCode: string) {
    const room = await this.getAnyRoomFromCodeAsAdmin(roomCode);
    this.reservationScenario.bookReservationDto = {
      roomId: room.id,
      timeSlot: this.reservationScenario.selectedCalendarDay,
    };
    try {
      const reservation: Reservation = await reservations_book(
        this.reservationScenario.bookReservationDto,
        StaticContext.loggedAccount.auth.access_token,
      );
      this.reservationScenario.reservationResource = reservation;
      this.reservationScenario.reservationIdsToTrash.push(reservation.id);
    } catch (e) {
      this.reservationScenario.reservationHasBeenRejected = true;
    }
  }

  @when(/I cancel the reservation/)
  public async cancelOneReservation() {
    let reservation: Reservation = await reservations_getOne(
      this.reservationScenario.reservationResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    await reservations_cancel(
      reservation.id,
      StaticContext.loggedAccount.auth.access_token,
    );
  }

  @then(/I get a confirmation for the reservation/)
  public async consultOneReservation() {
    const reservation: Reservation = await reservations_getOne(
      this.reservationScenario.reservationResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(reservation).to.be.not.null;
    expect(reservation.id).to.equal(
      this.reservationScenario.reservationResource.id,
    );
    expect(reservation.status).to.equal(EntityStatus.ACTIVE);
  }

  @then(/My reservation request is rejected/)
  public async checkBookRequestIsRejected() {
    expect(this.reservationScenario.reservationHasBeenRejected).to.be.true;
  }

  @then(/The reservation is properly cancelled/)
  public async checkReservationIsCancelled() {
    const reservation = await reservations_getOne(
      this.reservationScenario.reservationResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(reservation.status).to.equal(EntityStatus.CANCELLED);
    expect(reservation.cancelledOn).to.be.not.null;
  }

  private async getAnyRoomFromCodeAsAdmin(roomCode: string) {
    return await rooms_getOneFromCode(
      roomCode,
      await (
        await this.accountPool.accountFromRoleAndCompany('admin')
      ).auth.access_token,
    );
  }
}
