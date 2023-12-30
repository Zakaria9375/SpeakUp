<script setup>
import { useThreadStore } from '@/stores/ThreadStore'
import { ref } from 'vue'
const { id } = defineProps({
	id: { type: String, required: true },
})
const ThreadStore = useThreadStore()
const lastThread = ref(null)
ThreadStore.lastThread(lastThread, id)
</script>

<template>
	<div class="eval">
		<span class="title">Last thread:</span>
		<div class="last-thread" v-if="lastThread">
			<router-link :to="{ name: 'profile', params: { id: lastThread.madeBy.$id } }">
				<img class="avatar" :src="lastThread.madeBy?.avatar" :alt="lastThread.madeBy?.firstName" />
			</router-link>
			<div class="last-thread-details">
				<router-link :to="{ name: 'thread', params: { id: lastThread.$id } }">{{
					lastThread.title
				}}</router-link>
				<p>
					By
					<router-link :to="{ name: 'profile', params: { id: lastThread.madeBy.$id } }">{{
						lastThread.madeBy?.fullName
					}}</router-link
					>, <BaseDate v-if="lastThread.$createdAt" :isoTimestamp="lastThread.$createdAt" />
				</p>
			</div>
		</div>
		<div v-else class="last-thread">
			<p>Be the first one to create a thread</p>
		</div>
	</div>
</template>
<style lang="scss">
.eval {
	.title {
		display: block;
		padding: 0 0 8px;
	}
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
