<script lang="ts">
	import IconCards from "$svg/icons/IconCards.svelte";

	import IconLibrary from "$svg/icons/IconLibrary.svelte";
	import IconLogout from "$svg/icons/IconLogout.svelte";
	import IconSchedule from "$svg/icons/IconSchedule.svelte";

	import MenuLeftButton from "./MenuLeftButton.svelte";

	export let activePath: string = null;
</script>

<div class="menu-bar bg-white shadow-cola-block">
	<MenuLeftButton label="Dashboard" isActive={activePath === "/my-reservations"} path="/">
		<IconLibrary fillColor={activePath === "/my-reservations" ? "#ffffff" : "#999999"} />
	</MenuLeftButton>
	<MenuLeftButton label="Rooms" isActive={activePath === "/room-schedule"} path="/room-schedule">
		<IconSchedule fillColor={activePath === "/room-schedule" ? "#ffffff" : "#999999"} />
	</MenuLeftButton>
	<MenuLeftButton label="Quick Find" isActive={activePath === "/room-finder"} path="/room-finder">
		<IconCards fillColor={activePath === "/room-finder" ? "#ffffff" : "#999999"} />
	</MenuLeftButton>
	<MenuLeftButton label="Logout" isActive={false} path="/logout">
		<IconLogout fillColor="#999999" />
	</MenuLeftButton>
</div>

<style>
	.menu-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10000;
		display: flex;
		justify-content: space-between;
		height: 80px;
		width: 100%;
	}
</style>
