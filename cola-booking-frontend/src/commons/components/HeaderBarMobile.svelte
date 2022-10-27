<script lang="ts">
	import type { Account, Company } from "$libs/interfaces";
	import Logo from "$svg/Logo.svelte";
	import LogoCoke from "$svg/LogoCoke.svelte";
	import LogoPepsi from "$svg/LogoPepsi.svelte";
	import { getContext } from "svelte";
	import Avatar from "./Avatar.svelte";

	export let account: Account;

	let companies: Company[] = getContext("companies") as Company[];
	let accountCompany: Company = account?.companyId
		? companies.filter((c) => c.id === account?.companyId)[0]
		: null;
</script>

<div class="w-100 pl3 pv1 mb2 bg-cola-blue shadow-cola-menu">
	<div class="header-bar">
		<Logo />
		<div class="account-details ph2">
			<div class="tr white">{account?.profile?.firstName} {account?.profile?.lastName}</div>
			<div class="tr f7 pt2">
				{account?.profile?.jobPosition}
				{#if accountCompany}
					at
					{#if accountCompany.name === "Pepsi"}
						<LogoPepsi />
					{:else}
						<LogoCoke />
					{/if}
				{/if}
			</div>
		</div>
		<div><Avatar avatarUrl={account?.profile?.avatarUrl} /></div>
	</div>
</div>

<style>
	.header-bar {
		display: grid;
		grid-template-columns: 1fr 4fr 1fr;
		align-items: center;
		height: 60px;
	}
	.account-details {
		display: grid;
		justify-content: right;
	}
</style>
