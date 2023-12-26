<script setup>
import { useDataStore } from '@/stores/DataStore'
const { id } = defineProps({
	id: { type: String, required: true },
})
const { state, isReady } = useDataStore().lastThread(id)
</script>

<template>
	<div v-if="isReady" class="eval">
		<div class="last-thread" v-if="state">
			<img class="avatar" decoding="async" loading="lazy" :src="state.madeBy?.avatar" :alt="state.madeBy?.firstName" />
			<div class="last-thread-details">
				<router-link :to="{ name: 'thread', params: { id: state.$id } }">{{ state.title }}</router-link>
				<p>
					By <router-link :to="{ name: 'profile', params: { id: state.madeBy.$id } }">{{ state.madeBy?.fullName }}</router-link
					>, <BaseDate v-if="state.$createdAt" :isoTimestamp="state.$createdAt" />
				</p>
			</div>
		</div>
		<div v-else class="last-thread">
			<p>Be the first one to create a thread</p>
		</div>
	</div>
	<Spinner v-else class="eval" />
</template>
<style lang="scss">
.eval {
	flex-shrink: 0;
	.last-thread {
		@include zflex(row, nowrap, flex-start, center);
		.avatar {
			margin-right: 8px;
		}
		.last-thread-details {
			a {
				padding: 0 8px 8px 0;
				@include zfont(1.15rem, normal, $greclr);
			}
		}
		p {
			margin: 8px 8px 0 0;
		}
	}
}
</style>
