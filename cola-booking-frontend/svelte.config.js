import sveltePreprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		preserve: ["ld+json"],
	}),
	kit: {
		adapter: node(),//TODO replace by Vercel adapter ?

		target: "#svelte",
		hostHeader: "X-Forwarded-Host",
		vite: {
			build: {
				minify: "terser",
				chunkSizeWarningLimit: 1000,
			},
			optimizeDeps: {
				exclude: ['svelte-kit-cookie-session'],// see https://www.npmjs.com/package/svelte-kit-cookie-session
			},
			resolve: {
				alias: {
					$components: resolve("src/commons/components"),
					$stores: resolve("src/commons/stores"),
					$svg: resolve("src/commons/svg"),
					$datasources: resolve("src/commons/datasources"),
					$libs: resolve("src/commons/libs"),
					$appconfig: resolve("src/appconfig.ts"),
				},
			},
		},
	},
};
export default config;
