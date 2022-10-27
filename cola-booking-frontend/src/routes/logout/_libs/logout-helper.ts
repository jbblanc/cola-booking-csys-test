import { standardPost } from "$libs/api-utils";
import { appconfig } from "$appconfig";

export interface LogoutStatus {
	isValid: boolean;
	message: string;
}

export const logout = async (): Promise<LogoutStatus> => {
	const apiResp = await standardPost({
		route: `/signin/destroy`,
		token: null,
	});
	if (apiResp && apiResp.code === 200) {
		return {
			isValid: true,
			message: "Logout successful",
		};
	}
	return {
		isValid: false,
		message: "Logout failed",
	};
};
