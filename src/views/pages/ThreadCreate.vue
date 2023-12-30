<script setup>
import { computed, ref } from 'vue'
import { useAccDbStore } from '@/stores/AccDbStore'
import { useRouter } from 'vue-router'
import { useThreadStore } from '@/stores/ThreadStore'
import { useForumStore } from '@/stores/ForumStore'
import ThreadEditor from '@/components/threads/ThreadEditor.vue'
const router = useRouter()
const ThreadStore = useThreadStore()

const { id } = defineProps({
	id: { type: String, required: true },
})

const dbUser = computed(() => useAccDbStore().dbUser)
const forum = ref(null)
useForumStore().getForum(forum, id)

async function save(data) {
	const thread = {
		forum: id,
		title: data.title,
		content: data.content,
		madeBy: dbUser.value.$id,
	}
	await ThreadStore.createThread(thread)
	router.push({ name: 'forum', params: { id: id } })
}

function cancel() {
	router.push({ name: 'forum', params: { id: id } })
}
</script>

<template>
	<div v-if="forum" class="newthread-page z-clr z-page p-48">
		<div class="container">
			<div class="heading">
				<h1>{{ forum.name }}</h1>
				<h2>Create new thread</h2>
			</div>
			<ThreadEditor btn-submit="Create" @save="save" @cancel="cancel" />
		</div>
	</div>
</template>
<style lang="scss">
	.newthread-page {
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