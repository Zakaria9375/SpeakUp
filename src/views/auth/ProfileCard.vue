<script setup>
const { user } = defineProps({
	user: { required: true, type: Object },
})
</script>

<template>
	<div v-if="user.fullName" class="profile-card">
		<p class="text-center">
			<img :src="user.avatar" :alt="user.username" class="avatar-xlarge" />
		</p>
		<h1 class="name">{{ user.fullName }}</h1>
		<h2 class="username">({{ user.username }})</h2>
		<p class="bio">{{ user.bio ? user.bio : `No bio specified.` }}</p>
		<div class="stats">
			<span
				>{{ user.posts?.length > 0 ? user.posts?.length : 'no' }} post{{
					user.posts.length > 1 ? 's' : ''
				}}</span
			>
			<span
				>{{ user.threads?.length > 0 ? user.threads?.length : 'no' }} thread{{
					user.posts.length > 1 ? 's' : ''
				}}</span
			>
		</div>
	</div>
</template>
<style lang="scss">
.profile-card {
	.avatar-xlarge {
		width: 200px;
		height: 200px;
	}
	.name {
		@include zfont(2.25rem, 700, $dark);
		text-align: center;
		margin: 0 0 10px;
	}
	.username {
		@include zfont(1.5rem, 400, $graclr);
		text-align: center;
		margin: 0 0 16px;
	}
	.bio {
		@include zfont(1.25rem, 500, $dark);
	}
	.stats {
		@include zflex;
		margin: 20px 0;
		text-align: center;
		span {
			@include zfont(1.25rem, 400, $dark);
			flex-basis: 50%;
		}
	}
}
</style>
