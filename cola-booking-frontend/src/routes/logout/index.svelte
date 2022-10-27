<script lang="ts" context="module">
  import { logout, LogoutStatus } from "./_libs/logout-helper";
	export async function load({ page }) {
		const status: LogoutStatus = await logout();
		return {
			status: 302,
			redirect: "/?logout",
		};
	}
</script>

