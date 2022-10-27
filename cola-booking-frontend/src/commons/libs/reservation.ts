import { appconfig } from "$appconfig";
import { standardGet, standardPatch, standardPost } from "./api-utils";
import type { BookReservationDto, Reservation } from "./interfaces";

export const getReservationsForAccount = async (token: string): Promise<Reservation[]> => {
	const apiResp = await standardGet({
		route: `${appconfig.urls.apiBaseUrl}/reservations/mine`,
		token,
	});
	if (apiResp && apiResp.code === 200) {
		return apiResp.body.map((r) => {
			return {
				...r,
				timeSlot: new Date(r.timeSlot),
			};
		});
	}
};

export const getReservationsForRoomAndDay = async (
	roomId: string,
	day: Date,
	token: string
): Promise<Reservation[]> => {
	const apiResp = await standardGet({
		route: `${
			appconfig.urls.apiBaseUrl
		}/reservations/search?roomId=${roomId}&day=${day.toUTCString()}`,
		token,
	});
	if (apiResp && apiResp.code === 200) {
		return apiResp.body.map((r) => {
			return {
				...r,
				timeSlot: new Date(r.timeSlot),
			};
		});
	}
	return null; //TODO better error handling here
};

export const bookNewReservation = async (
	reservation: BookReservationDto,
	token: string
): Promise<Reservation> => {
	const apiResp = await standardPost({
		route: `${appconfig.urls.apiBaseUrl}/reservations`,
		token,
		data: reservation,
	});
	if (apiResp && (apiResp.code === 201 || apiResp.code === 200)) {
		return apiResp.body;
	}
	return null; //TODO enhance error management here
};

export const cancelReservation = async (reservationId: string, token: string): Promise<boolean> => {
	const apiResp = await standardPatch({
		route: `${appconfig.urls.apiBaseUrl}/reservations/${reservationId}/cancel`,
		token,
		noExpectedBody: true,
	});
	return apiResp && apiResp.code === 200;
};
