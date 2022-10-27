<script lang="ts">
	import { goto } from "$app/navigation";

	export let label: string = "Click me";
	export let style: string = "button";
	export let disabled: boolean = false;
	export let cy: string = "";
	export let link: string = null;
	export let buttonClicked;

	if (!buttonClicked && link) {
		buttonClicked = goto(link);
	}
</script>

<button class="pv1 ph3 {style}" data-cy={cy} on:click={buttonClicked} {disabled}>
	{label}
</button>

<style>
	button {
		/*padding: 0.5rem 2.75rem;*/
		outline: none;
		font-weight: #196373;
		white-space: nowrap;
		max-height: 2.25rem;
		min-height: 2.25rem;
		min-width: 8.8rem;
		width: fit-content;
	}

	.btn-small {
		min-width: 6.25rem;
		padding: 0.5rem 2rem;
	}

	button:hover {
		cursor: pointer;
	}

	button:disabled {
		background-color: grey;
		border: none;
		cursor: not-allowed;
	}
</style>
