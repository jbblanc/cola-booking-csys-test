import { standardPost } from "$libs/api-utils";
import { appconfig } from "$appconfig";

export async function post({ locals }) {
	//console.log('server side logout');
	locals.session.destroy();
	return {
		status: 200,
		body: {
			ok: true,
			message: "account logged out",
		},
	};
}
