<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/DataStore'
import ThreadEditor from '@/views/lists/ThreadEditor.vue'

const dataStore = useDataStore()
const userStore = useUserStore()
const router = useRouter()
const { id } = defineProps({
	id: { type: String, required: true },
})
const authUser = computed(() => userStore.authUser)
const { state: forum } = dataStore.getDoc('forums', id)

function save(data) {
	const thread = {
		forum: id,
		title: data.title,
		posts: [{ content: data.content, madeBy: authUser.value.$id }],
		madeBy: authUser.value.$id,
	}
	dataStore.createThread(thread)
}

function cancel() {
	router.push({ name: 'forum', params: { id: id } })
}
</script>

<template>
	<div class="newthread-page z-clr z-page p-48">
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