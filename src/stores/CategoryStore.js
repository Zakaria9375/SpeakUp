import { defineStore } from 'pinia'
import {
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
	getCollection,
} from '@/stores/helper'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categoryStore', () => {
	const categories = ref([])
	const getCategories = () => {
		return getCollection(categories, 'categories', 'CS: Fetched categories successfully')
	}
	const getCategory = (refVal, categoryId) => {
		return getDocument(refVal, 'categories', categoryId, 'CS: Fetched category successfully')
	}

	const createCategory = (categoryData) => {
		return createDocument('categories', categoryData, 'CS: Category created successfully')
	}

	const updateCategory = (categoryId, updatedData) => {
		return updateDocument(
			'categories',
			categoryId,
			updatedData,
			'CS: Category updated successfully'
		)
	}

	const deleteCategory = (categoryId) => {
		return deleteDocument('categories', categoryId, 'CS: Category deleted successfully')
	}

	return {
		categories,
		getCategories,
		getCategory,
		createCategory,
		updateCategory,
		deleteCategory,
	}
})
