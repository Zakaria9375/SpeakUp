<script setup>
import RecentActivity from '@/components/profile/RecentActivity.vue'
import MainProfile from '@/components/profile/MainProfile.vue'

const { id } = defineProps({
	id: { type: String, required: true },
})
</script>

<template>
	<div>
		<div class="profile-page z-page">
			<div class="container pb-16">
				<MainProfile :id="id"/>
				<RecentActivity :id="id"/>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.profile-page {
	
	background-color: $web;
	.container {
		@include more($lS) {
			@include zflex(row, nowrap, center, flex-start);
			gap: 3%;
		}
		@include less($lS) {
			@include zflex(column, wrap, center, center);
		}
	}
	
}
</style>
