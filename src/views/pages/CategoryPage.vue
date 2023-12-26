<script setup>
import ForumList from '@/views/lists/ForumList.vue'
import { useDataStore } from '@/stores/DataStore'

const dataStore = useDataStore()
const { id } = defineProps({
	id: { required: true, type: String },
})
const { state: category, isReady } = dataStore.getDoc('categories', id)
</script>

<template>
	<div v-if="isReady" class="category-page z-page z-clr p-32">
		<div class="container">
			<div class="c-details">
				<h1>{{ category.name }}</h1>
			</div>

			<ForumList v-if="category.forums" :forums="category.forums" />
		</div>
	</div>
</template>
<style lang="scss">
.category-page {
	.c-details h1 {
		text-align: center;
		@include zfont(2rem, 600, $darkblue);
		margin: 16px 0 20px;
		font-family: 'Merriweather', serif;
	}
}
</style>
