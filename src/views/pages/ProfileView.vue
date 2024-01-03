<script setup>
import RecentActivity from '@/components/profile/RecentActivity.vue'
import MainProfile from '@/components/profile/MainProfile.vue'
import { ref,onMounted } from 'vue'
const { id } = defineProps({
	id: { type: String, required: true },
})
const isReady = ref(false)
onMounted(() => {
	setTimeout(() => isReady.value = true, 1000)
})
</script>

<template>
	<div v-show="isReady">
		<div class="profile-page z-page">
			<div class="container pb-16">
				<MainProfile :id="id"/>
				<RecentActivity :id="id"/>
			</div>
		</div>
	</div>
	<AppLoading v-show="!isReady"/>
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
