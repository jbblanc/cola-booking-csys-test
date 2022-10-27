interface Request {
	method: string;
	headers: any;
	credentials?: RequestCredentials;
	body?: any;
}

export interface ApiResponse {
	body?: any;
	ok: boolean;
	code?: number; // http code
	error?: {
		message?: string;
		stack?: string;
	};
}

async function send(method: string, path: string, token: string, data?: any) {
	let headers;
	if (token) {
		headers = {
			Authorization: `Bearer ${token}`,
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		};
	} else {
		headers = {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		};
	}
	const opts: Request = {
		method,
		headers,
	};

	if (data) {
		// We check if the data is already stringified and if not we stringify it
		opts.body = typeof data === "string" ? data : JSON.stringify(data);
	}

	let url: string = `${path}`;

	return await fetch(url, opts);
}

function buildSuccessResponse(body: any, code?: number): ApiResponse {
	return {
		code,
		body,
		ok: true,
	};
}

function buildErrorResponse(message: string, stack?: string, code?: number): ApiResponse {
	return {
		code,
		error: {
			message,
			stack,
		},
		ok: false,
	};
}

function get({ route, token = null }) {
	return send("GET", route, token);
}

function post({ route, token = null, data = null }) {
	return send("POST", route, token, data);
}

function patch({ route, token = null, data = null }) {
	return send("PATCH", route, token, data);
}

function del({ route, token = null }) {
	return send("DEL", route, token);
}

async function standardGet({ route, token = null }): Promise<ApiResponse> {
	try {
		const res = await get({ route, token });
		if (res.status === 200) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse("GET failed - Unexpected status", "", res.status);
		}
	} catch (e) {
		return buildErrorResponse(e.message);
	}
}

async function standardPost({ route, token = null, data = null }): Promise<ApiResponse> {
	try {
		const res = await post({ route, token, data });
		if (res.status === 200 || res.status === 201) {
			const body = await res.json();
			return buildSuccessResponse(body, res.status);
		} else {
			//TODO get server message in body ??
			return buildErrorResponse("POST failed - Unexpected status", "", res.status);
		}
	} catch (e) {
		return buildErrorResponse(e.message);
	}
}

async function standardPatch({ route, token = null, data = null, noExpectedBody = false }) {
	try {
		const res = await patch({ route, token, data });
		if (res.status === 200) {
			if (noExpectedBody) {
				return buildSuccessResponse(null, res.status);
			} else {
				const body = await res.json();
				return buildSuccessResponse(body, res.status);
			}
		} else {
			//TODO get server message in body ??
			return buildErrorResponse("PATCH failed - Unexpected status", "", res.status);
		}
	} catch (e) {
		return buildErrorResponse(e.message);
	}
}

async function standardDel({ route, token = null, noExpectedBody = false }): Promise<ApiResponse> {
	try {
		const res = await del({ route, token });
		if (res.status === 200) {
			if (noExpectedBody) {
				return buildSuccessResponse(null, res.status);
			} else {
				const body = await res.json();
				return buildSuccessResponse(body, res.status);
			}
		} else {
			//TODO get server message in body ??
			return buildErrorResponse("DEL failed - Unexpected status", "", res.status);
		}
	} catch (e) {
		return buildErrorResponse(e.message);
	}
}

export { get, post, patch, del, standardGet, standardPost, standardPatch, standardDel };
