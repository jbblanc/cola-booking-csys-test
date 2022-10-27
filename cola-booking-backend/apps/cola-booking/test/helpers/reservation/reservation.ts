import { BookReservationDto } from "apps/cola-booking/src/reservation/dto/book-reservation.dto";
import { Reservation } from "apps/cola-booking/src/reservation/model/reservation.entity";
import { apiDelete, apiGet, apiHandleResponse, apiPatch, apiPost } from "../api-fetch";

async function reservations_book(dto: BookReservationDto, token: string): Promise<Reservation> {
  const resp = await apiPost({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/reservations/`,
    token,
    data: dto,
  });
  return await apiHandleResponse(resp, 201);
}

async function reservations_cancel(
  id: string,
  token: string,
): Promise<void> {
  const resp = await apiPatch({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/reservations/${id}/cancel`,
    token,
  });
}

async function reservations_getOne(id: string, token: string): Promise<Reservation> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/reservations/${id}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}


async function reservations_searchByRoomAndDay(roomId: string, day: Date, token: string): Promise<Reservation[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/reservations?day=${day}&roomId=${roomId}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function reservations_trashOne(id: string, token: string): Promise<void> {
  await apiDelete({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/reservations/${id}/trash`,
    token,
  });
}

export {
  reservations_book,
  reservations_cancel,
  reservations_getOne,
  reservations_searchByRoomAndDay,
  reservations_trashOne,
};