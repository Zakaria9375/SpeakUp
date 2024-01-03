<script setup>
import { usePostStore } from '@/stores/PostStore'
const PostStore = usePostStore()
const emit = defineEmits(['post-deleted', 'cancel'])
const { id } = defineProps({
	id: { type: String, required: true },
})
function deletePost() {
	PostStore.deletePost(id)
	emit('post-deleted')
}
</script>

<template>
	<div class="del-post">
		<p>Are you Sure you want to Delete this post ?</p>
		<div class="form-act">
			<button type="button" class="gh-btn" @click="emit('cancel')">cancel</button>
			<button type="button" class="blu-sm-btn" @click="deletePost">confirm</button>
		</div>
	</div>
</template>
<style lang="scss">
	.del-post {
		p {
			text-align: center;
			padding: 16px;
			margin: 0;
			@include zfont(1.5rem, 500, $dark)
		}
	}
</style>