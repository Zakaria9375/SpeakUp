import { defineStore } from 'pinia'
export const useForumStore = defineStore('ForumStore', {
	state: () => ({ forums: []}),
  getters: {
		findById(state) {
			return id => state.forums.find(forum => forum.id === id)
		},
		filterByCategoryId(state) {
			return id => state.forums.filter(forum => forum.categoryId === id)
		},
  },
  actions: {
  }
})