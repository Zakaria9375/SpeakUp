<script setup>
import PostCard from '@/components/posts/PostCard.vue'
import ThreadCard from '@/components/threads/ThreadCard.vue'
import { ref, computed, onMounted } from 'vue'
import { usePostStore } from '@/stores/PostStore'
import { useThreadStore } from '@/stores/ThreadStore'
const postStore = usePostStore()
const threadStore = useThreadStore()
const posts = ref(null)
const threads = ref(null)
const { id } = defineProps({
	id: { type: String, required: true },
})

const isReady = computed(() => (threads.value && posts.value ? true : false))
const currentFilter = ref('all')
const btns = ['threads', 'posts', 'all']
const all = computed(() => {
	if (isReady.value) {
		const combined = [...threads.value, ...posts.value]
		combined.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
		return combined
	}
})
const filteredArray = computed(() => {
	switch (currentFilter.value) {
		case 'posts':
			return posts.value
		case 'threads':
			return threads.value
		case 'all':
			return all.value
		default:
			return all.value
	}
})
const setFilter = (newValue) => {
	currentFilter.value = newValue
}
postStore.getPostsByUserId(posts, id)
threadStore.getThreadsByUserId(threads, id)
onMounted(() => {})
</script>

<template>
	<div class="main-activity cardW">
		<div class="profile-header">
			<h4>your's recent activity</h4>
			<div class="filters">
				<div class="form-act">
					<button
						v-for="btn in btns"
						@click="setFilter(btn)"
						:class="{ 'active-filter': currentFilter === btn }"
					>
						{{ btn }}
					</button>
				</div>
			</div>
		</div>
		<div v-if="filteredArray" class="activity-list">
			<div v-for="(item, index) in filteredArray" :key="index">
				<div v-if="item.$collectionId">
					<div class="thread-view" v-if="item.$collectionId === 'threads'">
						<router-link
							:to="{ name: 'thread', params: { id: item.$id } }"
							class="thread-link"
							title="Visit the thread"
							><i class="fa-solid fa-arrow-up-right-from-square"></i></router-link
						><ThreadCard :onlineDisplay="false" :thread="item" />
					</div>

					<PostCard v-if="item.$collectionId === 'posts'" :onlineDisplay="false" :post="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.main-activity {
	@include more($lS) {
		flex: 1 1 67%;
	}
	width: 100%;
	.profile-header {
		@include zflex(row, wrap, space-between);
		padding: 0 12px 8px;
		@include less($smS) {
			@include zflex(column);
			padding: 0 12px 16px;
			h4 {
				align-self: flex-start;
			}
		}
		h4 {
			@include zfont(1.15rem, 600, $dark);
			text-transform: capitalize;
		}

		.form-act {
			align-self: flex-end;
			button {
				margin: 4px 8px;
				@include zfont(1.075rem, 600, $dark);
				@include zbtn($webD, 8px 12px);
				&:hover {
					background-color: $wnice;
				}
			}
			.active-filter {
				@include zbtn($bluclr, 8px 12px);
				color: #fff;
			}
		}
	}
	.activity-list {
		.thread-view {
			position: relative;
			.thread-link {
				position: absolute;
				right: 15px;
				top: 65px;
				z-index: 3;
				i {
					font-size: 1.125rem;
					color: $darkblue;
					cursor: pointer;
					&:hover {
						font-size: 1.25rem;
					}
				}
			}
		}
	}
}
</style>
