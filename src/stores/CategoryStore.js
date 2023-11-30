import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('CategoryStore', {
	state: () => ({ categories: []}),
  getters: {
		findById(state) {
			return id => state.categories.find(category => category.id === id)
		}
  },
  actions: {
  }
})