<script setup>
import { usePostStore } from '@/stores/PostStore'
import PostEditor from '@/components/posts/PostEditor.vue'
const PostStore = usePostStore()
const emit = defineEmits(['post-added'])
const props = defineProps({
	threadId: { type: String, required: true },
})
function addPost(payload) {
	const post = {
		...payload,
		thread: props.threadId,
	}
	PostStore.createPost(post)
	emit("post-added")
}
</script>

<template>
	<post-editor @save="addPost" />
</template>

