import { BookReservationDto } from "apps/cola-booking/src/reservation/dto/book-reservation.dto";
import { Reservation } from "apps/cola-booking/src/reservation/model/reservation.entity";
import { ScenarioBaseContext } from "../scenario-base-context";

const dayDifferentFromColaDay: Date = new Date('2021-12-20'); // Date here should be any date but cola day

export class ReservationScenarioContext extends ScenarioBaseContext {
  public reservationResource: Reservation;
  public bookReservationDto: BookReservationDto;
  public reservationsList: Reservation[];
  public reservationIdsToTrash: string[] = [];
  public selectedCalendarDay: Date = dayDifferentFromColaDay;
  public reservationHasBeenRejected: boolean = false;

  constructor() {
    super();
  }

  public reset() {
    super.reset();
    this.reservationResource = null;
    this.bookReservationDto = null;
    this.reservationsList = null;
    this.reservationIdsToTrash = [];
    this.selectedCalendarDay = dayDifferentFromColaDay;
    this.reservationHasBeenRejected = false
    // ...
  }
}