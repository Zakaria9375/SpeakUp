<script setup>
import { useDataStore } from '@/stores/DataStore'
import PostEditor from '@/views/lists/PostEditor.vue'
const dataStore = useDataStore()
const emit = defineEmits(['post-updated'])
const props = defineProps({
	post: { type: Object, required: true },
})
function updatePost(payload) {
	const postId = props.post.$id
	const newPost = {
		...payload,
		thread: props.post.thread,
		madeBy: props.post.madeBy,
	}
	dataStore.updatePost(postId, newPost)
	emit("post-updated")
}
</script>

<template>
	<post-editor @save="updatePost" :content="post.content" btnSubmit="update"/>
</template>

