<script setup>
import { useThreadStore } from '@/stores/ThreadStore';
const { id } = defineProps({ 
	id: { type: String, required: true }
})
const lastThread = useThreadStore().lastThread(id)

</script>

<template>
	<div class="last-thread" v-if="lastThread">
		<img class="avatar" :src="lastThread.author.avatar" alt="" />
		<div class="last-thread-details">
			<a href="#">{{lastThread.title}}</a>
			<p class="text-xsmall">
				By <a href="profile.html">{{ lastThread.author.name }}</a>, <AppDate :timeStamp="lastThread.publishedAt" />
			</p>
		</div>
	</div>
	<div v-else class="last-thread">
		<p>Be the first one to create a thread</p>
	</div>
</template>
