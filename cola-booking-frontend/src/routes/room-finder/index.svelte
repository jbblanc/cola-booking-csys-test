<script lang="ts">
	import DateSelector from "$components/DateSelector.svelte";
	import Header from "$components/Header.svelte";
	import { bookNewReservation } from "$libs/reservation";
	import { session } from "$app/stores";
	import { formatWithMeridian, setCleanHour } from "$libs/date-utils";
	import type { Room } from "$libs/interfaces";
	import { getAvailableRoomsForDayAndTimeSlot } from "$libs/rooms";
	import AvailableRoomCard from "./_components/AvailableRoomCard.svelte";
	import { onMount } from "svelte";
	import { isPhone } from "$stores/media";
	import { goto } from "$app/navigation";
import { fade, fly } from "svelte/transition";

	let daySlots: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
	let availableRooms: Room[] = [];

	let selectedDay: Date = new Date("2021-11-18"); // default Cola Day (2 days after the presentation)
	let selectedTimeSlot: number;
	let isColaDay: boolean = false;

	async function onSelectedDayChanged(event: CustomEvent){
		selectedDay = event.detail as Date;
		await refreshRooms();
	}

	async function onNewTimeSlotSelected() {
		await refreshRooms();
	}

	async function refreshRooms(){
		availableRooms = await getAvailableRoomsForDayAndTimeSlot(
			setCleanHour(selectedDay, selectedTimeSlot),
			$session.token
		);
	}

	async function onNewBookRequest(event: CustomEvent) {
		const room: Room = event.detail;
		const newReservation = await bookNewReservation(
			{ roomId: room.id, timeSlot: setCleanHour(selectedDay, selectedTimeSlot) },
			$session.token
		);
		if (newReservation) {
			availableRooms = availableRooms.filter((r) => r.id !== room.id);
			goto("/my-reservations");
		} else {
			//TODO notif if error
		}
	}

	onMount(() => {
		onNewTimeSlotSelected();
	});

	$: isColaDay =
		selectedDay.getDate() === 18 &&
		selectedDay.getMonth() === 10 &&
		selectedDay.getFullYear() === 2021;
</script>

<Header title="Room Finder" />

<div class="f6 silver tc ph2 ph1-ns">
	You can quickly check which rooms are available for a given time slot in schedule
</div>
<div class="main-block ph3 mt2">
	<div class="mt2"><DateSelector date={selectedDay} on:dateChanged={onSelectedDayChanged} /></div>
	{#if isColaDay}
		<div class="mv3 tc orange">🎊 THIS IS COLA DAY !! 🥳</div>
	{/if}
</div>
<div class="main-block ph3 mt2 bg-white shadow-cola-block">
	<div class="mt2">Choose a time slot:</div>
	<div class="mt2" data-cy="time_slot_selector">
		<select bind:value={selectedTimeSlot} on:change={onNewTimeSlotSelected}>
			{#each daySlots as timeSlot}
				<option value={timeSlot}>
					{formatWithMeridian(timeSlot)} : {formatWithMeridian(timeSlot + 1)}
				</option>
			{/each}
		</select>
	</div>
</div>
<div class="rooms-block ph3 bg-white">
  <div class="mt3 silver">Here are the rooms available for this slot:</div>
	<div class="mt2 mb4">
		<div class="room-list{$isPhone ? '-mobile' : ''}" data-cy="available_rooms_list">
			{#each availableRooms as room, i}
				<div class="pa3" in:fade={{ duration: 200 * i }}>
					<AvailableRoomCard {room} on:book={onNewBookRequest} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.main-block {
		display: grid;
		justify-content: center;
		grid-template-columns: 20rem;
		grid-template-rows: 2rem 3rem auto;
	}

	.rooms-block {
		display: grid;
		justify-content: center;
		grid-template-columns: 100%;
	}

	.room-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-items: center;
	}
	.room-list-mobile {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
	}
</style>
