<script lang="ts">
	import DateSelector from "$components/DateSelector.svelte";
	import Header from "$components/Header.svelte";
	import RoomDailySchedule from "./_components/RoomDailySchedule.svelte";
	import {
		bookNewReservation,
		cancelReservation,
		getReservationsForRoomAndDay,
	} from "$libs/reservation";
	import { session } from "$app/stores";
	import { setCleanHour } from "$libs/date-utils";
	import { onMount } from "svelte";
	import type { Reservation, Room, ScheduleSlot } from "$libs/interfaces";
	import { getMyRooms } from "$libs/rooms";

	let selectedDay: Date = new Date("2021-11-18"); // default Cola Day (2 days after the presentation)
	let selectedRoom: Room;
	let reservationsForRoom: Reservation[] = [];
	let isColaDay: boolean = false;
	let rooms: Room[] = [];

	async function onSelectedDayChanged(event: CustomEvent){
		selectedDay = event.detail as Date;
		await refreshMyRooms();
	}

	async function onNewRoomSelected() {
		await refreshSchedule();
	}

	async function refreshSchedule(){
		reservationsForRoom = await getReservationsForRoomAndDay(
			selectedRoom.id,
			selectedDay,
			$session.token
		);
	}

	async function refreshMyRooms(){
		rooms = await getMyRooms(selectedDay, $session.token);
		if(rooms && rooms.length > 0){
			selectedRoom = rooms[0];
			onNewRoomSelected();
		}
	}

	async function onNewBookRequest(event: CustomEvent) {
		const slot: ScheduleSlot = event.detail;
		const newReservation = await bookNewReservation(
			{ roomId: selectedRoom.id, timeSlot: setCleanHour(selectedDay, slot.startHour) },
			$session.token
		);
		if (newReservation) {
			newReservation.timeSlot = new Date(newReservation.timeSlot);
			reservationsForRoom.push(newReservation);
			reservationsForRoom = reservationsForRoom;
		} else {
			//TODO notif if error
		}
	}

	async function onCancelRequest(event: CustomEvent) {
		const reservation: Reservation = event.detail;
		const cancelled = await cancelReservation(reservation.id, $session.token);
		if (cancelled) {
			reservationsForRoom = reservationsForRoom.filter((r) => r.id !== reservation.id);
		} else {
			//TODO notif if error
		}
	}

	onMount(async () => {
		await refreshMyRooms();
	});

	$: isColaDay =
		selectedDay.getDate() === 18 &&
		selectedDay.getMonth() === 10 &&
		selectedDay.getFullYear() === 2021;
</script>

<Header title="Room Schedule" />

<div class="f6 silver tc ph2 ph1-ns">
	You can consult each room schedule for the selected date, and book any available slot
</div>
<div class="main-block ph3 mt2">
	<div class="mt2"><DateSelector date={selectedDay} on:dateChanged={onSelectedDayChanged} /></div>
	{#if isColaDay}
		<div class="mv3 tc orange">🎊 THIS IS COLA DAY !! 🥳</div>
	{/if}
</div>
<div class="main-block ph3 mt2 bg-white shadow-cola-block" data-cy="room_selector">
	<div class="centered-content mt2">Choose a room:</div>
	<div class="centered-content mt2">
		<select bind:value={selectedRoom} on:change={onNewRoomSelected}>
			{#each rooms as room}
				<option value={room}>
					{room.code}{room.floor ? ` (floor: ${room.floor})` : ""}
				</option>
			{/each}
		</select>
	</div>
	<div>
		<div class="mt2 mb4">
			<RoomDailySchedule
				reservations={reservationsForRoom}
				on:book={onNewBookRequest}
				on:cancel={onCancelRequest} />
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

	.centered-content {
		display: grid;
		justify-items: center;
	}
</style>
