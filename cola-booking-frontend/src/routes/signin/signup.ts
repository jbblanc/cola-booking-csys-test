import { standardPost } from "$libs/api-utils";
import { appconfig } from "$appconfig";
import type { RegisterDto } from "./_libs/register-helper";

export async function post({ locals, body }) {
	// register on API
	const registerDto: RegisterDto = body;
	const apiResp = await standardPost({
		route: `${appconfig.urls.apiBaseUrl}/auth/signup`,
		data: registerDto,
	});
  if (apiResp && apiResp.code === 201) {
		const authDetails = apiResp.body;
    if (authDetails && authDetails.token && authDetails.account) {
			//write in session (stored/handled by kit hooks in a secured cookie)
			locals.session.data = authDetails;
			return {
				status: 201,
				body: {
					status: "OK",
				},
			};
		}
	}
	return {
		status: apiResp.code,
		body: {
			message: "Registration failed",
		},
	};
}
