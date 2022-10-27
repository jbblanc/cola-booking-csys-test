import { appconfig } from "$appconfig";
import { standardGet } from "./api-utils";
import type { Company } from "./interfaces";

export const getCompanies = async (): Promise<Company[]> => {
	const apiResp = await standardGet({
		route: `${appconfig.urls.apiBaseUrl}/companies`,
	});
	if (apiResp && apiResp.code === 200) {
		return apiResp.body;
	}
	return null; //TODO better error handling here
};
