<script lang="ts">
	import IconSchedule from "$svg/icons/IconSchedule.svelte";

	import IconCards from "../svg/icons/IconCards.svelte";

	import IconLibrary from "../svg/icons/IconLibrary.svelte";
	import IconLogout from "../svg/icons/IconLogout.svelte";

	import Logo from "../svg/Logo.svelte";
	import MenuLeftButton from "./MenuLeftButton.svelte";

	export let activePath: string = null;
</script>

<div class="sticky bg-white menu-bar">
	<div class="athena-logo"><Logo /></div>
	<div title="My Reservations">
		<MenuLeftButton
			label="Dashboard"
			isActive={activePath === "/my-reservations"}
			path="/my-reservations"
			datacy="btn_menu_my_reservations">
			<IconLibrary fillColor={activePath === "/my-reservations" ? "#ffffff" : "#999999"} />
		</MenuLeftButton>
	</div>
	<div title="Room Schedule">
		<MenuLeftButton
			label="Rooms"
			isActive={activePath === "/room-schedule"}
			path="/room-schedule"
			datacy="btn_menu_room_schedule">
			<IconSchedule fillColor={activePath === "/room-schedule" ? "#ffffff" : "#999999"} />
		</MenuLeftButton>
	</div>
	<div title="Room Finder">
		<MenuLeftButton
			label="Quick Find"
			isActive={activePath === "/room-finder"}
			path="/room-finder"
			datacy="btn_menu_room_finder">
			<IconCards fillColor={activePath === "/room-finder" ? "#ffffff" : "#999999"} />
		</MenuLeftButton>
	</div>

	<div />
	<div class="account-zone bt-cola-hr">
		<MenuLeftButton label="Logout" path="/logout" datacy="btn_logout">
			<IconLogout fillColor="#999999" />
		</MenuLeftButton>
	</div>
</div>

<style>
	.menu-bar {
		display: grid;
		grid-template-columns: 80px;
		grid-template-rows: 80px repeat(3, 50px) auto 60px;
	}
	.athena-logo {
		height: 80px;
		display: grid;
		justify-content: center;
		align-items: center;
	}

	.sticky {
		position: fixed;
		width: 80px;
		height: 100vh;
	}

	.account-zone {
		display: grid;
		justify-items: center;
	}
</style>
