<script lang="ts">
	import { formatDateAsDay, getNextDay, getPreviousDay } from "$libs/date-utils";
	import IconNext from "$svg/icons/IconNext.svelte";
	import IconPrevious from "$svg/icons/IconPrevious.svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let date: Date = new Date();

	function onPreviousDay() {
		date = getPreviousDay(date);
		dispatch('dateChanged', date);
	}
	function onNextDay() {
		date = getNextDay(date);
		dispatch('dateChanged', date);
	}
</script>

<div class="main-block" data-cy="date_selector">
	<div class="btn" on:click={() => onPreviousDay()}><IconPrevious /></div>
	<div>{formatDateAsDay(date)}</div>
	<div class="btn" on:click={() => onNextDay()}><IconNext /></div>
</div>

<style>
	.main-block {
		display: grid;
		grid-template-columns: 1fr 6fr 1fr;
		justify-items: center;
		align-items: center;
	}
	.btn {
		cursor: pointer;
	}
</style>
