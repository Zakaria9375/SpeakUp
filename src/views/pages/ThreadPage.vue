<script setup>
import { onUnmounted, computed, ref } from 'vue'
import { useThreadStore } from '@/stores/ThreadStore'
import { useAccDbStore } from '@/stores/AccDbStore'
import { client } from '@/config/AppWrite.js'
import { useToggle } from '@/composables/toggle.js'

import PostCreate from '@/components/posts/PostCreate.vue'
import ThreadDelete from '@/components/threads/ThreadDelete.vue'
import PostCard from '@/components/posts/PostCard.vue'
import ThreadCard from '@/components/threads/ThreadCard.vue'

const ThreadStore = useThreadStore()
const authId = useAccDbStore().authId

const { id } = defineProps({
	id: { required: true, type: String },
})
const { refValue, open, close } = useToggle()
const { refValue: del, open: openDel, close: closeDel } = useToggle()
const thread = ref(null)
ThreadStore.getThread(thread, id)

const contributors = computed(() => {
	const unique = new Set()
	if (thread.value) {
		thread.value.posts.forEach((p) => {
			if (p && p.madeBy) {
				unique.add(p.madeBy.$id)
			}
		})
	}
	return unique.size
})

const unsub = client.subscribe(
	[
		'databases.appData.collections.posts.documents',
		`databases.appData.collections.threads.documents.${id}`,
	],
	(response) => {
		ThreadStore.getThread(thread, id)
		console.log('sub msg from thread page', response)
	}
)

onUnmounted(() => unsub())
</script>

<template>
	<div v-if="thread" class="thread-page z-page">
		<div class="container">
			<div class="leading">
				<div v-if="authId === thread.madeBy.$id" class="form-act">
					<button @click="openDel" type="button" class="gh-btn">Delete thread</button>
					<router-link :to="{ name: 'editThread', params: { id: thread.$id } }" class="zbtn">
						Edit thread
					</router-link>
				</div>

				<span class="counts"
					>{{ thread.posts?.length}} replies by {{ contributors }} contributors</span
				>
			</div>
			<ThreadCard :thread="thread" />
			<div class="post-list">
				<div v-for="post in thread.posts" :key="post.$id">
					<PostCard :post="post" />
				</div>
			</div>
			<div class="form-act">
				<button type="button" class="zbtn" @click="open">Add new post</button>
			</div>
		</div>
	</div>
	<PopUp v-if="refValue" @close="close">
		<PostCreate v-if="thread" :threadId="thread.$id" @post-added="close"/>
	</PopUp>
	<PopUp class="del-main" v-if="del" @close="closeDel">
		<ThreadDelete
			v-if="thread"
			:id="thread.$id"
			:forumId="thread.forum.$id"
			@thread-deleted="closeDel"
			@cancel="closeDel"
		/>
	</PopUp>
</template>

<style lang="scss">
.thread-page {
	padding-top: 16px;
	padding-bottom: 54px;
	.leading {
		@include zflex(column, wrap, center, flex-end);
		.gh-btn {
			@include zfont(1.125rem, 400, #000);
			@include zbtn(#adaaaa, 10px 22px);
			margin-right: 12px;
		}
		.zbtn {
			width: fit-content;
		}
		span.counts {
			padding: 12px 0;
			@include zfont(1.125rem, 300, $gra2clr);
		}
	}
}
</style>
