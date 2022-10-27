<script lang="ts" context="module">
	import type { Company } from "$libs/interfaces";
	import { getCompanies } from "$libs/companies";

	export async function load() {
		try {
			let companies: Company[] = await getCompanies();
			return {
				status: 200,
				props: {
					companies,
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
	import { fade, fly } from "svelte/transition";
	import Input from "$components/forms/Input.svelte";
	import { isPhone } from "$stores/media";

	import { register, RegisterStatus, RegisterDto } from "./_libs/register-helper";
	import { appconfig } from "$appconfig";
	import LogoCoke from "$svg/LogoCoke.svelte";
	import LogoPepsi from "$svg/LogoPepsi.svelte";
	import Seo from "$components/SEO.svelte";

	export let companies: Company[] = [];
	let dto: RegisterDto = {
		email: null,
		password: null,
		hasAcceptedTerms: true,
		hasConsentedDataProcessing: true,
	};
	let errorMessage: string = null;

	async function attemptToRegister() {
		errorMessage = null;
		const status: RegisterStatus = await register(dto);
		if (status && status.isValid) {
			document.location.href = appconfig.urls.baseUrl as string;
		} else {
			errorMessage = status.message;
		}
	}
</script>

<Seo title="Cola Booking - Register your account" />

<div class="main-box w-100" class:vh-100={!$isPhone}>
	<div class="register-box w-50-ns w-80" in:fly={{ duration: 1000, y: 300 }} out:fly={{ duration: 500, y: -300 }}>
		<form on:submit|preventDefault={attemptToRegister}>
			<div class="pv2 mv2 tc">Please select your company</div>
			<div class="select-company pv2">
				<div />
				<div class="radio-company">
					<input
						type="radio"
						class="radio"
						bind:group={dto.companyId}
						name="companyId"
						value={companies.filter((c) => c.name === "Coke")[0]?.id} />
					<LogoCoke />
				</div>
				<div class="radio-company">
					<input
						type="radio"
						class="radio"
						bind:group={dto.companyId}
						name="companyId"
						value={companies.filter((c) => c.name === "Pepsi")[0]?.id} />
					<LogoPepsi />
				</div>
				<div />
			</div>
			<div class="pv2 mv2 tc">Please enter your information</div>
			<div class="pv2">
				<Input
					bind:value={dto.firstName}
					type="text"
					datacy="input_signin_firstname"
					placeholder="First Name *" />
			</div>
			<div class="pv2">
				<Input
					bind:value={dto.lastName}
					type="text"
					datacy="input_signin_lastname"
					placeholder="Last Name *" />
			</div>
			<div class="pv2">
				<Input
					bind:value={dto.jobPosition}
					type="text"
					datacy="input_signin_jobposition"
					placeholder="Job Position" />
			</div>
			<div class="pv2">
				<Input
					bind:value={dto.email}
					type="text"
					datacy="input_signin_email"
					placeholder="Email *" />
			</div>
			<div class="pv2">
				<Input
					bind:value={dto.password}
					type="password"
					datacy="input_signin_password"
					placeholder="Choose a strong password *" />
			</div>
			<div class="pv2">
				<input type="submit" value="Register" class="btn-primary" />
			</div>
			{#if errorMessage}
				<div>{errorMessage}</div>
			{/if}
			<div class="mt3 tr">
				Already have an account ? <a href="/signin" class="link">Signin here</a>
			</div>
		</form>
	</div>
</div>

<style>
	.main-box {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: center;
	}
	.register-box {
		display: grid;
		grid-template-columns: 1fr;
	}

	input {
		cursor: pointer;
	}

	.select-company {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		justify-content: center;
	}

	.radio-company {
		display: grid;
		grid-template-columns: 1fr 3fr;
		align-items: center;
	}
</style>
