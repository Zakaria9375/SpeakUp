<script setup>
import { useDataStore } from '@/stores/DataStore'
import PostEditor from '@/views/lists/PostEditor.vue'
const dataStore = useDataStore()

const props = defineProps({
	threadId: { type: String, required: true },
})
function addPost(payload) {
	const post = {
		...payload,
		thread: threadId,
	}
	dataStore.createPost(post)
}
</script>

<template>
	<post-editor @save="addPost" />
</template>

