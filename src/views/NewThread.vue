<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { useThreadStore } from '@/stores/ThreadStore'
import { usePostStore } from '@/stores/PostStore'
import { useRouter } from 'vue-router'
import { useForumStore } from '@/stores/ForumStore'

const router = useRouter()
const { id } = defineProps({
	id: { type: String, required: true },
})
const forum = useForumStore().findById(id)
const form = reactive({
	title: '',
	text: '',
})

function save() {
	const thread = {
		forumId: id,
		title: form.title,
		posts: [],
		userId: useUserStore().authId,
		contributors: [],
		publishedAt: Math.floor(Date.now() / 1000),
		id: '',
	}
	useThreadStore().setNewThread(thread)
	const post = {
		text: form.text,
		publishedAt: Math.floor(Date.now() / 1000),
		userId: useUserStore().authId,
		id: '',
		threadId: thread.id
	}

	usePostStore().createPost(post);
	router.push({name: 'forum', params: { id: id}})
}
function cancel() {
	router.push({name: 'forum', params: { id: id}})
}
</script>

<template>
	<div>
		<div class="col-full push-top">
			<h1>
				Create new thread in <i>{{ forum.name }}</i>
			</h1>
			<form @submit.prevent="save">
				<div class="form-group">
					<label for="thread_title">Title:</label>
					<input type="text" v-model="form.title" id="thread_title" class="form-input" name="title" />
				</div>
				<div class="form-group">
					<label for="thread_content">Content:</label>
					<textarea
						id="thread_content"
						class="form-input"
						name="content"
						rows="8"
						cols="140"
						v-model="form.text"
					></textarea>
				</div>
				<div class="btn-group">
					<button @click="cancel" class="btn btn-ghost">Cancel</button>
					<button class="btn btn-blue" type="submit" name="Publish">Publish</button>
				</div>
			</form>
		</div>
	</div>
</template>
