import { standardPost } from "$libs/api-utils";
import { appconfig } from "$appconfig";

export interface SigninStatus{
	isValid: boolean;
	message: string;
}

export const signin = async (email: string, password: string): Promise<SigninStatus> => {
	const apiResp = await standardPost({
		route: `/signin/auth`,
		token: null,
		data: {
			email,
			password,
		},
	});
	if (apiResp && apiResp.code === 200) {
		return {
			isValid: true,
			message: 'Signin successful'
		};
	}
	return {
		isValid: false,
		message: 'Signin failed'
	};
};
