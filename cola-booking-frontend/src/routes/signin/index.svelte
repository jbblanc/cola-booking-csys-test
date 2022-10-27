<script lang="ts">
  import { fade, fly } from "svelte/transition";
	import { appconfig } from "$appconfig";
	import Input from "$components/forms/Input.svelte";
	import { isPhone } from "$stores/media";
	import LogoSignup from "$svg/LogoSignup.svelte";

	import { signin, SigninStatus } from "./_libs/signin-helper";
import Seo from "$components/SEO.svelte";

	let email: string = null;
	let password: string = null;
	let errorMessage: string = null;

	async function attemptSignin() {
		errorMessage = null;
		const status: SigninStatus = await signin(email, password);
		if (status && status.isValid) {
			document.location.href = appconfig.urls.baseUrl as string;
		} else {
			errorMessage = status.message;
		}
	}
</script>

<Seo title="Cola Booking - Signin" />

<div class="main-box w-100" class:vh-100={!$isPhone}>
	<div class="login-box w-50-ns w-80" in:fly={{ duration: 1000, y: 300 }} out:fly={{ duration: 500, y: -300 }}>
		<div class="tc mb5-ns mb5 mb6-ns"><LogoSignup /></div>
		<form on:submit|preventDefault={attemptSignin} data-cy="form_signin">
			<div class="pv2 mv2 tc">Please enter your credentials</div>
			<div class="pv2">
				<Input
					bind:value={email}
					type="text"
					datacy="input_signin_email"
					placeholder="Email" />
			</div>
			<div class="pv2">
				<Input
					bind:value={password}
					type="password"
					datacy="input_signin_password"
					placeholder="Password" />
			</div>
			<div class="pv2">
				<input type="submit" value="Signin" class="btn-primary" data-cy="btn_signin_submit" />
			</div>
			{#if errorMessage}
				<div>{errorMessage}</div>
			{/if}
			<div class="mt3 tr">
				No account yet ? <a href="/signin/register" class="link" data-cy="link_register">Register here</a>
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
	.login-box {
		display: grid;
		grid-template-columns: 1fr;
	}

	input {
		cursor: pointer;
	}
</style>
