<script setup>
import ForumList from '@/components/ForumList.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { computed, ref } from 'vue'

const CategoryStore = useCategoryStore()
const { id } = defineProps({
	id: { required: true, type: String },
})
const category = computed(() => {
	if (CategoryStore.categories) {
		return CategoryStore.categories.find((c) => c.$id === id)
	} else {
		CategoryStore.getCategories()
		return CategoryStore.categories.find((c) => c.$id === id)
	}
})
const isReady = ref(false)
setTimeout(() => isReady.value = true, 300)
</script>

<template>
	<div v-if="isReady" class="category-page z-page z-clr p-32">
		<div class="container">
			<div class="c-details">
				<h1>{{ category.name }}</h1>
			</div>

			<ForumList v-if="category.forums" :forums="category.forums"/>
		</div>
	</div>
	<AppLoading v-else />
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
