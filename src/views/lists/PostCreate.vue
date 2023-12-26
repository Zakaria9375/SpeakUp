<script setup>
import { useDataStore } from '@/stores/DataStore'
import PostEditor from '@/views/lists/PostEditor.vue'
const dataStore = useDataStore()
const emit = defineEmits(['post-added'])
const props = defineProps({
	threadId: { type: String, required: true },
})
function addPost(payload) {
	const post = {
		...payload,
		thread: props.threadId,
	}
	dataStore.createPost(post)
	emit("post-added")
}
</script>

<template>
	<post-editor @save="addPost" />
</template>

