<script lang="ts">
	import type { ScheduleSlot } from "$libs/interfaces";
  import { createEventDispatcher } from "svelte";
  
	export let slot: ScheduleSlot = null;
	export let datacy: string = "";

  const dispatch = createEventDispatcher();
  
  function bookNewReservation(){
    dispatch('book', slot);
  }
</script>

<div class="main-block w-100 br2 ba b--silver bg-black-05 silver">
  Available 
  <button class="pv1 ph1 f6 ttu" data-cy="btn_book_{datacy}" on:click={()=>{bookNewReservation()}}>Book</button>
</div>

<style>
	.main-block {
    height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
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
