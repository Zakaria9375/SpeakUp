<script setup>
import { usePostStore } from '@/stores/PostStore'
import PostEditor from '@/components/posts/PostEditor.vue'
const PostStore = usePostStore()
const emit = defineEmits(['post-updated'])
const {post} = defineProps({
	post: { type: Object, required: true },
})
function updatePost(payload) {
	const postId = post.$id
	const newPost = {
		...payload,
	}
	PostStore.updatePost(postId, newPost)
	emit("post-updated")
}
</script>

<template>
	<post-editor @save="updatePost" :content="post.content" btnSubmit="update"/>
</template>

