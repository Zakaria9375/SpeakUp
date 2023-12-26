<script setup>
import PostList from '@/views/lists/PostList.vue'
import PostCreate from '@/views/lists/PostCreate.vue'
import { useDataStore } from '@/stores/DataStore'
import { useToggle } from '@/composables/toggle.js'
import { ref, computed } from 'vue'
import PostCard from '@/views/lists/PostCard.vue'
const dataStore = useDataStore()
const { id } = defineProps({
	id: { required: true, type: String },
})
const { refValue, open, close } = useToggle()
const { state: thread, isReady } = dataStore.getDoc('threads', id)
const contributors = computed(() => {
	const unique = new Set()
	if (isReady) {
		thread.value.posts.forEach((p) => {
			if (p && p.madeBy) {
				unique.add(p.madeBy)
			}
		})
	}
	return unique.size
})
</script>

<template>
	<div v-if="isReady" class="thread-page z-page">
		<div class="container">
			<div class="leading">
				<router-link :to="{ name: 'editThread', params: { id: thread.$id } }" class="zbtn">
					Edit thread
				</router-link>

				<span class="counts"
					>{{ thread.posts?.length }} replies by {{ contributors }} contributors</span
				>
			</div>
			<div class="t-title">
				<h1 class="list-title">{{ thread.title }}</h1>
			</div>
			<!-- <PostList v-if="thread.posts" :posts="thread.posts" /> -->
			<div class="post-list">
				<div v-for="(post, index) in thread.posts" :key="post.$id">
					<div :class="{ 'first-post': index === 0 }">
						<PostCard :post="post" />
					</div>
				</div>
			</div>
			<div class="form-act">
				<button type="button" class="zbtn" @click="open">Add new post</button>
			</div>
		</div>
	</div>
	<PopUp v-if="refValue" @close="close">
		<PostCreate v-if="thread" :threadId="thread.$id" />
	</PopUp>
</template>

<style lang="scss">
.thread-page {
	padding-top: 16px;
	padding-bottom: 54px;
	.leading {
		@include zflex(column, wrap, center, flex-end);
		.zbtn {
			width: fit-content;
		}
		span.counts {
			padding: 16px 0;
			@include zfont(1.125rem, 300, $gra2clr);
		}
	}
	.t-title {
		@include zflex;
		h1 {
			text-align: center;
			width: fit-content;
		}
	}
	.post-list {
		.first-post {
			.post {
				border: 1px solid #000;
			}
		}
	}
}
</style>
