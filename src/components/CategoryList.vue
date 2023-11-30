<script setup>
import ForumList from '@/components/ForumList.vue';
import { useForumStore } from '@/stores/ForumStore';
const forumStore = useForumStore()
const { categories } = defineProps({
	categories: {
		type: Array,
		required: true,
	},
})

</script>

<template>
	<div>
		<ForumList 
			v-for="category in categories"
			:key="category.id"
			:forums="forumStore.filterByCategoryId(category.id)"
			:title="category.name"
			:categoryId = "category.id"
		></ForumList>
	</div>
</template>