<script setup>
import { watchEffect, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/DataStore'
import ThreadEditor from '@/views/lists/ThreadEditor.vue';
const router = useRouter()
const dataStore = useDataStore()
const { id } = defineProps({
	id: { type: String, required: true },
})
const loading = ref(false)
const { state: thread, isReady } = dataStore.getDoc('threads', id)
const firstPost = computed(() => {
	if (isReady && thread.value) {
		return thread.value.posts[0]
	}
})
const postsIds = computed(() => {
	if (isReady && thread.value) {
		return thread.value.posts.map((p) => p.$id).slice(1)
	}
})

function save(data) {
	const threadId = thread.value.$id
	const postId = firstPost.value.$id
	const updatedPost = {
		thread: threadId,
		madeBy: firstPost.value.madeBy,
		content: data.content,
	}
	const updatedThread = {
		forum: thread.value.forum,
		title: data.title,
		posts: postsIds.value,
		madeBy: thread.value.madeBy,
	}
	dataStore.updateThreadPost(loading, postId, updatedPost, threadId, updatedThread)
}
function cancel() {
	router.push({ name: 'thread', params: { id: id } })
}
</script>

<template>
	<div v-if="isReady && !loading" class="updateThread-page z-clr z-page p-48">
		<div v-if="thread" class="container">
			<div class="heading">
				<h1>{{ thread.title }}</h1>
				<h2>Update your thread</h2>
			</div>
			<ThreadEditor
				v-if="firstPost"
				:title="thread.title"
				:content="firstPost.content"
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
