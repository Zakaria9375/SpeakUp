<script setup>
import ThreadList from '@/components/ThreadList.vue';
import { useForumStore } from '@/stores/ForumStore.js'
import { useThreadStore } from '@/stores/ThreadStore.js'
const forumStore = useForumStore()
const threadStore = useThreadStore()
const { id } = defineProps({
	id: { required: true, type: String },
})
const forum = forumStore.findById(id)
</script>

<template>
	<div class="col-full push-top">
		<div class="forum-header">
			<div class="forum-details ">
				<h1>{{ forum.name }}</h1>
				<p class="text-lead">
					{{ forum.description }}
				</p>
			</div>
			<router-link 
			:to="{name: 'newThread', params: { id: forum.id }}" class="btn-green btn-small">
				Start a thread
			</router-link>
		</div>
		<div class="col-full push-top">
			<ThreadList :threads ="threadStore.filterByForumId(id)"/>
		</div>
	</div>
</template>
