<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThreadStore } from '@/stores/ThreadStore'
import ThreadEditor from '@/components/threads/ThreadEditor.vue'

const router = useRouter()
const ThreadStore = useThreadStore()

const { id } = defineProps({
	id: { type: String, required: true },
})

const thread = ref(null)
ThreadStore.getThread(thread, id)

async function save(data) {
	try {
		const threadId = thread.value.$id
		const updatedThread = {
			title: data.title,
			content: data.content,
		}
		await ThreadStore.updateThread(threadId, updatedThread)
		router.push({ name: 'thread', params: { id: threadId } })
	} catch (error) {
		console.error('Error saving data:', error)
		// Handle error (e.g., show notification to the user)
	}
}

function cancel() {
	router.push({ name: 'thread', params: { id: id } })
}
</script>

<template>
	<div class="updateThread-page z-clr z-page p-48">
		<div v-if="thread" class="container">
			<div class="heading">
				<h1>{{ thread.title }}</h1>
				<h2>Update your thread</h2>
			</div>
			<ThreadEditor
				:title="thread.title"
				:content="thread.content"
				btn-submit="Update"
				@save="save"
				@cancel="cancel"
			/>
		</div>
	</div>
</template>
<style lang="scss">
.updateThread-page {
	.container {
		.heading {
			text-align: center;
			h1 {
				@include zfont(2.25rem, 800, $darkblue);
			}
			h2 {
				@include zfont(1.875rem, 500, #666);
			}
		}
	}
}
</style>
