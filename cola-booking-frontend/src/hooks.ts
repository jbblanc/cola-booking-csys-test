import { handleSession } from "svelte-kit-cookie-session";

const secret1 = import.meta.env.VITE_SESSION_SECRET_1;

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }) {
	return locals.session.data;
}

export const handle = handleSession(
	{
		secret: [
			/*{
				id: 2,
				secret: "SOME_OTHER_COMPLEX_SECRET_AT_LEAST_32_CHARS",
			},*/
			{
				id: 1,
				secret: secret1.toString(),
			},
		],
		//rolling: true, /* autorefresh of session expiration at each request */
	},
	({ request, resolve }) => {
		// request.locals is populated with the session `request.locals.session`
    return resolve(request);
	}
);
