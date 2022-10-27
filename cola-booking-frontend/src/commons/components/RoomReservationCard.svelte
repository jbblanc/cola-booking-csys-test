<script lang="ts">
	import { session } from "$app/stores";
	import { formatDateAsDay, formatWithMeridian } from "$libs/date-utils";

	import type { Reservation } from "$libs/interfaces";
	import IconTrash from "$svg/icons/IconTrash.svelte";
	import LogoCoke from "$svg/LogoCoke.svelte";
	import LogoPepsi from "$svg/LogoPepsi.svelte";
	import { createEventDispatcher } from "svelte";
import { fade } from "svelte/transition";

	export let reservation: Reservation;
	export let display: string = "owner"; // owner OR date
	export let datacy: string = "";

	const dispatch = createEventDispatcher();

	function cancelReservation() {
		dispatch("cancel", reservation);
	}
</script>

<div
	data-cy="reservation_card_{datacy}"
	class="main-block w-100 br2 ba"
	class:b--coke={reservation?.roomDetails?.company === "Coke"}
	class:b--pepsi={reservation?.roomDetails?.company === "Pepsi"}
	in:fade={{ duration: 500 }}>
	<div
		class:bg-coke={reservation?.roomDetails?.company === "Coke"}
		class:bg-pepsi={reservation?.roomDetails?.company === "Pepsi"} />
	<div class="content-block">
		<div class="content-top">
			<div class="pl1 pt1 f6" >
				{#if display === "date"}
					{formatDateAsDay(reservation?.timeSlot)} :
					<span>
						{formatWithMeridian(reservation?.timeSlot.getHours())} - {formatWithMeridian(
							reservation?.timeSlot.getHours() + 1
						)}</span>
				{:else}
					{reservation?.ownerDetails?.fullName}
				{/if}
			</div>
			<div>
				{#if reservation?.ownerAccountId === $session.account.id}
					<div class="cancel mr2 mt1" data-cy="btn_cancel_{datacy}" on:click={() => cancelReservation()}>
						<IconTrash />
					</div>
				{/if}
			</div>
		</div>
		<div class="content-bottom">
			<div class="pl1 f4">{reservation?.roomDetails?.code}</div>
			<div class="content-company pr1 f6 ttu">
				{#if reservation?.roomDetails?.company === "Pepsi"}
					<LogoPepsi />
				{:else}
					<LogoCoke />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.main-block {
		height: 100%;
		display: grid;
		grid-template-columns: 10px auto;
	}

	.content-block {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

	.content-top {
		display: grid;
		grid-template-columns: 80% 20%;
	}
	.content-bottom {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}
	.content-company {
		display: grid;
		justify-content: right;
	}

	.cancel {
		cursor: pointer;
		display: grid;
		align-items: center;
		justify-content: center;
		outline: none;
		white-space: nowrap;
		min-height: 1.7rem;
		min-width: 3rem;
		border-radius: 4px;
		background: rgb(197, 84, 84);
		border: 1px solid rgb(197, 84, 84);
		color: white;
	}
</style>
