// CAUTION => No sensitive data ever here (passwords, keys, etc)
// this can be exposed on client side !!
const baseUrl = import.meta.env.VITE_BASE_URL;
const cdnBaseUrl = import.meta.env.VITE_CDN_BASE_URL;
const apiBaseUrl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_ENV;
const isDevEnv = import.meta.env.DEV;

// CAUTION => No sensitive data ever here (passwords, keys, etc)
// this can be exposed on client side !!
export let appconfig = {
	env,
	isDevEnv,
	urls: {
		baseUrl,
		cdnBaseUrl,
		apiBaseUrl,
	},
};
