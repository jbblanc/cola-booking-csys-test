import { appconfig } from "$appconfig";
import { standardGet } from "./api-utils";
import type { Room } from "./interfaces";

export const getMyRooms = async (day: Date, token: string): Promise<Room[]> => {
	const apiResp = await standardGet({
		route: `${appconfig.urls.apiBaseUrl}/rooms/mine?day=${day.toUTCString()}`,
		token,
	});
	if (apiResp && apiResp.code === 200) {
		return apiResp.body;
	}
	return null; //TODO better error handling here
};

export const getAvailableRoomsForDayAndTimeSlot = async (
	day: Date,
	token: string
): Promise<Room[]> => {
	const apiResp = await standardGet({
		route: `${
			appconfig.urls.apiBaseUrl
		}/rooms/search?availableForTimeSlot=${day.toUTCString()}`,
		token,
	});
	if (apiResp && apiResp.code === 200) {
		return apiResp.body;
	}
	return null; //TODO better error handling here
};
