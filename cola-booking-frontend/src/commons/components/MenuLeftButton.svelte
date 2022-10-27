<script lang="ts">
	import { goto } from "$app/navigation";
	import { isPhone } from "$stores/media";

	export let label: string = null;
	export let path: string = "/";
	export let isActive: boolean = false;
	export let datacy: string = "";

	let showLabel: boolean = false;

	function onClicked() {
		if (path) {
			goto(path);
		}
	}
</script>

<div
	data-cy={datacy}
	class="btn-cola w-100 br2"
	class:is-active={isActive}
	class:bg-cola-blue={isActive}
	class:br--left={!$isPhone}
	class:br--top={$isPhone}
	class:btn-cola-mobile={$isPhone}
	on:click={() => {
		onClicked();
	}}>
	{#if showLabel}
		{label}
	{:else}
		<slot />
	{/if}
</div>

<style>
	.btn-cola {
		cursor: pointer;
		height: 50px;
		display: grid;
		justify-content: center;
		align-items: center;
		color: rgba(0, 0, 0, 0.4);
	}

	.btn-cola-mobile {
		height: 80px;
	}

	.is-active {
		color: #ffffff;
	}
</style>
