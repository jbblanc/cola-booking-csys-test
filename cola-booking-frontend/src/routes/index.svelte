<script lang="ts" context="module">
	export async function load() {
		// no content in '/'
		return {
			status: 302,
			redirect: "/my-reservations",
		};
	}
</script>
