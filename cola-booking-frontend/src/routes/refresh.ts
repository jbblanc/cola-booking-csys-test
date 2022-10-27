/** @type {import('@sveltejs/kit').RequestHandler} */
export async function put({ locals, body }) {
	locals.session.refresh(/** Optional new expiration time in days */);

	return {
		body: {
			ok: true,
			message: "Account session has been extended",
		},
	};
}
