<script setup>
import ForumList from '@/views/lists/ForumList.vue'
const { categories } = defineProps({
	categories: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div class="main-page z-page z-clr p-32">
		<div class="container">
			<ForumList
				v-for="category in categories"
				:key="category.$id"
				:forums="category.forums"
				:title="category.name"
				:categoryId="category.$id"
			></ForumList>
		</div>
	</div>
</template>
<style lang="scss">
.main-page {

}
</style>