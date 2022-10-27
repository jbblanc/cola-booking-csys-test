<script lang="ts">
	import { appconfig } from "$appconfig";

	import { media, isPhone } from "$stores/media";
	import LeftBanner from "./_components/LeftBanner.svelte";
	let windowWidth: number;
	$: if (windowWidth) media.up(windowWidth);
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

<div class="w-100 vh-100" class:mobile-layout={$isPhone} class:default-layout={!$isPhone}>
	{#if $isPhone}
		<div class="content bg-white-70"><slot /></div>
	{:else}
		<LeftBanner />
		<div>
			<slot />
		</div>
	{/if}
</div>

<style>
	.default-layout {
		display: grid;
		grid-template-columns: 40% 60%;
	}

	.mobile-layout {
		background-image: url("/img/bg-signin.jpg");
		background-color: rgba(255, 255, 255, 70);
		display: grid;
		grid-template-columns: 100%;
	}

	.content {
		display: grid;
		grid-template-columns: 100%;
		align-items: center;
	}
</style>
