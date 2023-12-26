<script setup>
import ThreadList from '@/views/lists/ThreadList.vue'
import { useDataStore } from '@/stores/DataStore'
const dataStore = useDataStore()
const { id } = defineProps({
	id: { required: true, type: String },
})
const { state: forum, isReady } = dataStore.getDoc('forums', id)
</script>

<template>
	<div v-if="isReady" class="forum-page z-page z-clr p-32">
		<div class="container">
			<div class="f-header">
				<div class="f-details">
					<h1>{{ forum.name }}</h1>
					<p>
						{{ forum.description }}
					</p>
				</div>
				<router-link :to="{ name: 'newThread', params: { id: forum.$id } }" class="zbtn">
					Start a thread
				</router-link>
			</div>
			<ThreadList v-if="forum.threads" :threads="forum.threads" />
		</div>
	</div>
</template>
<style lang="scss">
.forum-page {
	
	.f-header {
		padding: 16px;
		@include zflex(row, wrap, space-between, center);
		@include less($mS) {
			flex-direction: column-reverse;
		}
		.f-details {
			text-align: center;
			h1 {
				text-align: center;
				@include zfont(2rem, 600, $darkblue);
				margin: 16px;
				font-family: 'Merriweather', serif;
			}
			p {
				@include zfont(1.125rem, 400, $graclr);
			}
		}
	}
}
</style>
