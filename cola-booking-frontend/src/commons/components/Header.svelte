<script lang="ts">
	import { session } from "$app/stores";

	import type { Account, Company } from "$libs/interfaces";

	import { isPhone } from "$stores/media";
	import LogoCoke from "$svg/LogoCoke.svelte";
	import LogoPepsi from "$svg/LogoPepsi.svelte";
	import { getContext } from "svelte";
	import Avatar from "./Avatar.svelte";

	export let title: string = null;
	let account: Account = $session.account;
	let companies: Company[] = getContext("companies") as Company[];
	let accountCompany: Company = account?.companyId
		? companies.filter((c) => c.id === account?.companyId)[0]
		: null;
</script>

{#if $isPhone}
	<div class="w-100 pl3 pt2 mb4">
		<div class="header-mobile">
			<div class="w-70 f3-cola marianne-bold ">{title}</div>
		</div>
	</div>
{:else}
	<div class="w-100 pl3 pt2 mb4">
		<div class="header-desktop">
			<div class="w-100 f3-cola marianne-bold">{title}</div>
			<div class="ph2">
				<div class="tr blue-cola">
					{account?.profile?.firstName}
					{account?.profile?.lastName}
				</div>
				<div class="tr f7 pt1">
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
{/if}

<style>
	.header-mobile {
		display: flex;
	}

	.header-desktop {
		display: grid;
		grid-template-columns: 60% auto 70px;
		align-items: center;
	}
</style>
