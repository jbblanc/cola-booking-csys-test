<script lang="ts" context="module">
	import { getCompanies } from "$libs/companies";
	import type { Company } from "$libs/interfaces";
	export async function load({ session, page }) {
		try {
			const isLogout: boolean = page.query.get("logout") !== null;
			if (isLogout || !session || !session.account || !session.account.id) {
				// no authenticated account => access denied
				return {
					status: 302,
					redirect: "/signin",
				};
			}
			const companies: Company[] = await getCompanies();
			return {
				// standard entry in every page (when properly authenticated)
				status: 200,
				props: {
					activePath: page.path,
					companies,
				},
			};
		} catch (error) {
			return {
				status: 302,
				redirect: "/signin",
			};
		}
	}
</script>

<script lang="ts">
	import "../commons/styles/global.css";
	import MenuLeft from "$components/MenuLeft.svelte";
	import { media, isPhone } from "$stores/media";
	import MenuMobile from "$components/MenuMobile.svelte";
	import HeaderBarMobile from "$components/HeaderBarMobile.svelte";
	import { session } from "$app/stores";
	import { getContext, setContext } from "svelte";
	import { appconfig } from "$appconfig";

	export let activePath: string;
	export let companies: Company[] = [];

	let windowWidth: number;

	$: if (windowWidth) media.up(windowWidth);

	// loading companies details in context
	setContext("companies", companies);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
	<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
	<link
		rel="icon"
		type="image/png"
		href="{appconfig.urls.cdnBaseUrl}/favicon.png"
		crossorigin="use-credentials" />

	{#if appconfig.env !== "production"}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

{#if $isPhone}
	<HeaderBarMobile account={$session.account} />
	<slot />
	<div class="mb5" />
	<MenuMobile {activePath} />
{:else}
	<div class="main-layout">
		<div class="shadow-cola-block bg-white z-9999">
			<MenuLeft {activePath} />
		</div>
		<div>
			<slot />
		</div>
	</div>
{/if}

<style>
	.main-layout {
		display: grid;
		grid-template-columns: 80px 1fr;
		grid-auto-rows: max-content;
	}
</style>
