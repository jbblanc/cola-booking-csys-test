<script lang="ts" context="module">
	import { getReservationsForAccount } from "$libs/reservation";

	export async function load({ session }) {
		try {
			let reservationsForAccount: Reservation[] = await getReservationsForAccount(
				session.token
			);
			return {
				status: 200,
				props: {
					reservationsForAccount,
				},
			};
		} catch (error) {
			return {
				error,
				status: 500,
			};
		}
	}
</script>

<script lang="ts">
	import { session } from "$app/stores";
	import Button from "$components/Button.svelte";
	import Header from "$components/Header.svelte";
	import type { Reservation } from "$libs/interfaces";
	import { isPhone } from "$stores/media";
	import { cancelReservation } from "$libs/reservation";
	import RoomReservationCard from "$components/RoomReservationCard.svelte";
	import { goto } from "$app/navigation";
	import { formatWithMeridian } from "$libs/date-utils";
	import { fly } from "svelte/transition";

	export let reservationsForAccount: Reservation[] = [];
	let hasReservations: boolean = false;

	async function onCancelReservation(event: CustomEvent) {
		const reservation: Reservation = event.detail;
		const cancelled = await cancelReservation(reservation.id, $session.token);
		if (cancelled) {
			reservationsForAccount = reservationsForAccount.filter((r) => r.id !== reservation.id);
		} else {
			//TODO notif if error
		}
	}

	$: hasReservations = reservationsForAccount && reservationsForAccount.length > 0;
</script>

<Header title="My Reservations" />

<div class="buttons">
	<Button
		label="Book reservation"
		style="btn-primary-outlined"
		buttonClicked={() => {
			goto("/room-schedule");
		}} />

	<Button
		label="Find a room"
		style="btn-primary"
		buttonClicked={() => {
			goto("/room-finder");
		}} />
</div>
<div class="main-block vh-100 ph3 mt4 bg-white shadow-cola-block">
	<div class="ph2 ph1-ns mt3 f6 blue-cola tc">
		{#if hasReservations}
			You have <span class="f4">{reservationsForAccount.length}</span> reservations
		{:else}
			No reservation booked
		{/if}
	</div>
	<div>
		<div class="mt2 mb4">
			<div class="reservation-list{$isPhone ? '-mobile' : ''}">
				{#each reservationsForAccount as reservation, i}
					<div class="w-100 pv1 ph3 ph2-ns" >
						<div in:fly={{ duration: 300 * i, x: -200 }}>
							<RoomReservationCard
								{reservation}
								display="date"
								datacy={formatWithMeridian(reservation.timeSlot.getHours())}
								on:cancel={onCancelReservation} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.main-block {
		display: grid;
		justify-content: center;
		grid-template-columns: 100%;
		grid-template-rows: 4rem auto;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		align-items: center;
	}
	.reservation-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-items: center;
	}
	.reservation-list-mobile {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
	}
</style>
