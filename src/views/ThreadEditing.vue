<script setup>
import { reactive } from 'vue'
import { useThreadStore } from '@/stores/ThreadStore'
import { usePostStore } from '@/stores/PostStore'
import { useRouter } from 'vue-router'

const { id } = defineProps({
	id: { type: String, required: true },
})
const threadStore = useThreadStore()
const postStore = usePostStore()
const router = useRouter()

const thread =threadStore.findById(id)
const firstPost = postStore.findById(thread.firstPostId)
const form = reactive({
	title: thread.title,
	text: firstPost.text,
})

function save() {
	threadStore.updateThread(thread, form.title)
	postStore.updatePost(firstPost, form.text)
	router.push({name: 'thread', params: { id: id}})
}
function cancel() {
	router.push({name: 'thread', params: { id: id}})
}
</script>

<template>
	<div>
		<div class="col-full push-top">
			<h1>
				Editing in <i>{{ thread.title }}</i>
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
					<button @click="cancel" type="button" class="btn btn-ghost">Cancel</button>
					<button class="btn btn-blue" type="submit" name="Update">Update</button>
				</div>
			</form>
		</div>
	</div>
</template>
