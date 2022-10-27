<script lang="ts">
	/* Svelte */
	import { slide } from "svelte/transition";

	/* Helpers */

	export let value: string = "";
	export let type: string = "text";
	export let placeholder: string = "";
	export let autocomplete: string = "";

	//validation
	let isInputClicked: boolean = false;
	export let errors: string[] = [];
	export let isFormChecked: boolean = false;
	export let isRequired: boolean = false;
	export let datacy: string;

	$: displayError = isInputClicked || isFormChecked;
</script>

{#if type === "text"}
	<input
		type="text"
		{placeholder}
		bind:value
		data-cy={datacy}
		{autocomplete}
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
	{#if errors.length && displayError}
		<p class="input-error" transition:slide|local={{ duration: 500 }}>
			{errors[0]}
		</p>
	{/if}
{:else if type === "password"}
	<input
		type="password"
		{placeholder}
		bind:value
		data-cy={datacy}
		{autocomplete}
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
	{#if errors.length && displayError}
		<p class="input-error" transition:slide={{ duration: 500 }}>
			{errors[0]}
		</p>
	{/if}
{:else if type === "email"}
	<input
		type="email"
		{placeholder}
		bind:value
		data-cy={datacy}
		autocomplete="email"
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		required={isRequired}
		on:input={() => (isInputClicked = true)} />
	{#if errors.length && displayError}
		<p class="input-error" transition:slide={{ duration: 500 }}>
			{errors[0]}
		</p>
	{/if}
{:else if type === "tel"}
	<input
		type="text"
		{placeholder}
		bind:value
		data-cy={datacy}
		autocomplete="tel"
		class:error={errors.length && displayError}
		class:valid={!errors.length && value}
		on:input={() => (isInputClicked = true)} />
	{#if errors.length && displayError}
		<p class="input-error" transition:slide={{ duration: 500 }}>
			{errors[0]}
		</p>
	{/if}
{/if}

<style>
	
</style>
