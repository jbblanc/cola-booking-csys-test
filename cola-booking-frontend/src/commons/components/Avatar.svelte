<script lang="ts">
  export let avatarUrl: string;
</script>

<div class="avatar">
  <img src={avatarUrl} alt="connected account" />
</div>

<style>
  .avatar {
		width: 50px;
		height: 50px;
		overflow: hidden;
		border-radius: 50%;
		border: 2px solid silver;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		height: 50px;
		width: 50px;
	}
</style>