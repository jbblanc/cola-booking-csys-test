<script lang="ts">
	import { scheduleDailySlots } from "$datasources/schedule-slot.datasource";
	import { formatWithMeridian } from "$libs/date-utils";
	import type { Reservation, ScheduleSlot } from "$libs/interfaces";
	import RoomReservationCard from "$components/RoomReservationCard.svelte";
	import ScheduleFreeSlot from "./ScheduleFreeSlot.svelte";
import { fade, fly } from "svelte/transition";

	export let reservations: Reservation[] = [];
	let scheduleSlots = scheduleDailySlots;

	function getReservationForSlotIfAny(slot: ScheduleSlot): Reservation {
		const reservation = reservations.filter((r) => r.timeSlot.getHours() === slot.startHour);
		return reservation.length > 0 ? reservation[0] : null;
	}

	$: if (reservations) {
		scheduleSlots = scheduleDailySlots;
	}
</script>

<div class="schedule" data-cy="room_schedule">
	{#each scheduleSlots as slot, i}
		<div class="schedule-slot" in:fly={{ duration: 150 * i, y: -150 }}>
			<div class="schedule-slot-time bt b--silver f7 silver">
				{formatWithMeridian(slot.startHour)}
			</div>
			<div class="pa1 bt b--silver">
				{#if getReservationForSlotIfAny(slot) !== null}
					<RoomReservationCard reservation={getReservationForSlotIfAny(slot)} datacy={formatWithMeridian(slot.startHour)} on:cancel />
				{:else}
					<ScheduleFreeSlot {slot} datacy={formatWithMeridian(slot.startHour)} on:book />
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.schedule {
		display: grid;
		grid-template-columns: 1fr;
	}
	.schedule-slot {
		height: 5rem;
		display: grid;
		grid-template-columns: 30px auto;
	}
	.schedule-slot-time {
		display: grid;
		justify-items: right;
	}
</style>
