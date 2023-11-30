<script setup>
import CategoryList from '@/components/CategoryList.vue'
import { useCategoryStore } from '@/stores/CategoryStore'

const categoryStore = useCategoryStore()
</script>

<template>
	<div>
		<h1>Welcome</h1>
		<CategoryList :categories="categoryStore.categories" />
	</div>
</template>
