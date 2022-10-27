import { standardPost } from "$libs/api-utils";
import { appconfig } from "$appconfig";

export async function post({ locals, body }) {
	// auth on API
	const { email, password } = body;
	const apiResp = await standardPost({
		route: `${appconfig.urls.apiBaseUrl}/auth/login`,
		data: {
			email,
			password,
		},
	});
	if (apiResp && apiResp.code === 200) {
		const authDetails = apiResp.body;
		// if token, init cookie + session
		if (authDetails && authDetails.token && authDetails.account) {
			//write in session (stored/handled by kit hooks in a secured cookie)
			locals.session.data = authDetails;
			return {
				status: 200,
				body: {
					status: "OK",
				},
			};
		}
	}
	return {
		status: 403,
		body: {
			message: "Login failed",
		},
	};
}
