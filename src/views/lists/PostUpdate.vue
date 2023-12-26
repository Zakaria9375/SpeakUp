<script setup>
import { useDataStore } from '@/stores/DataStore'
import PostEditor from '@/views/lists/PostEditor.vue'
const dataStore = useDataStore()

const props = defineProps({
	post: { type: Object, required: true },
})
function updatePost(payload) {
	const postId = post.$id
	const post = {
		...payload,
		thread: post.thread,
		madeBy: post.madeBy,
	}
	dataStore.updatePost(postId, post)
}
</script>

<template>
	<post-editor @save="updatePost" :content="post.content" btnSubmit="update"/>
</template>

