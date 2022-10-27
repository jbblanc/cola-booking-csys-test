<script lang="ts">
	import type { Room } from "$libs/interfaces";
	import { createEventDispatcher } from "svelte";

	export let room: Room;

	const dispatch = createEventDispatcher();

	function bookRoom() {
		dispatch("book", room);
	}
</script>

<div class="main-block br2 ba b--silver bg-black-05">
	<div class="room-details">
		<div class="f4 black">{room.code}</div>
		<div class="silver">Floor : {room.floor}</div>
	</div>
	<button class="pv1 ph1 f6 ttu" data-cy="btn_book_{room.code}" on:click={bookRoom}>Book</button>
</div>

<style>
	.main-block {
		height: 5rem;
    width: 15rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		justify-items: center;
	}

  .room-details {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

	button {
		outline: none;
		white-space: nowrap;
		min-height: 2.5rem;
		min-width: 5rem;
		border-radius: 4px;
		background: rgb(84, 161, 197);
		border: 1px solid rgb(84, 161, 197);
		color: white;
	}

	button:hover {
		cursor: pointer;
		background: rgb(110, 195, 235);
		border: 1px solid rgb(110, 195, 235);
	}

	button:active {
		cursor: pointer;
		background: rgb(110, 195, 235);
		border: 1px solid rgb(5, 109, 158);
	}
</style>
