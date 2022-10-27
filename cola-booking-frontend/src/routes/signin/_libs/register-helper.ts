import { standardPost } from "$libs/api-utils";

export interface RegisterStatus{
	isValid: boolean;
	message: string;
}

export interface RegisterDto {
	email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  jobPosition?: string;
  hasAcceptedTerms: boolean;
  hasConsentedDataProcessing: boolean;
}

export const register = async (data: RegisterDto): Promise<RegisterStatus> => {
	const apiResp = await standardPost({
		route: `/signin/signup`,
		token: null,
		data,
	});
	if (apiResp && apiResp.code === 201) {
		return {
			isValid: true,
			message: 'Register successful'
		};
	}
	return {
		isValid: false,
		message: 'Register failed'
	};
};
