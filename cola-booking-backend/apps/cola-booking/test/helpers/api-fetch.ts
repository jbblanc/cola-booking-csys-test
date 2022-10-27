import fetch from 'node-fetch';

interface Request {
  method: string;
  headers: any;
  credentials?: RequestCredentials;
  body?: any;
}
async function apiFetch(method: string, path, token, data?): Promise<any> {
  let headers;
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };
  } else {
    headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };
  }
  const opts: Request = {
    method,
    headers,
  };

  if (data) {
    // We check if the data is already stringified and if not we stringify it
    data = typeof data === 'string' ? data : JSON.stringify(data);
    opts.body = data;
  }

  let url: any = `${path}`;

  try {
    let response = await fetch(url, opts);
    /*if (!response.ok) {
			throw response;
		} else {
			return response;
		}*/
    return response;
  } catch (e) {
    console.log('error : ', e);
  }
}

async function apiGet({ route, token = null }): Promise<any> {
  return apiFetch('GET', route, token);
}

async function apiPost({ route, token = null, data = null }): Promise<any> {
  return apiFetch('POST', route, token, data);
}

async function apiPatch({ route, token = null, data = null }): Promise<any> {
  return apiFetch('PATCH', route, token, data);
}

async function apiDelete({ route, token = null, data = null }): Promise<any> {
  const resp = await apiFetch('DELETE', route, token, data);
  if (resp.status != 200) {
    throw Error("Invalid response for DELETE => http status: " + resp.status);
  }
}

async function apiRespToJson(resp: any): Promise<any> {
  if (resp) {
    return await resp.json();
  } else {
    return null;
  }
}

async function apiHandleResponse(resp: any, successCode: number): Promise<any> {
  //console.log(resp.status);
  if (resp.status != successCode) {
    throw Error(resp.status);
  }
  return await apiRespToJson(resp);
}

export { apiHandleResponse, apiRespToJson, apiGet, apiPost, apiPatch, apiDelete };
