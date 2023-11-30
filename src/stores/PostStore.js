import { defineStore } from 'pinia'
import { useThreadStore } from '@/stores/ThreadStore.js'
export const usePostStore = defineStore('PostStore', {
	state: () => ({ posts: []}),
  getters: {
		findById(state) {
			return id => state.posts.find(post => post.id === id)
		},
		filterByThreadId(state) {
			return id => state.posts.filter(post => post.threadId === id)
		},
		filterByUserId(state) {
			return id => state.posts.filter(post => post.userId === id)
		},
  },
  actions: {
		createPost(post) {
			post.id = ('gggg' + Math.random())
			this.posts.push(post)
			const thread = useThreadStore().findById(post.threadId)
			thread.posts.push(post.id)
			thread.contributors.push(post.userId)
		},
		updatePost(post, newtext){	
			const index = this.posts.findIndex(p => p.id === post.id)
			if(index !== -1){
				this.posts[index] = { ...post, text: newtext }
			} else {
				this.posts.push(post)
			}
		}
  }

})