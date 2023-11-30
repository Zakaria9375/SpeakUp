import { defineStore } from 'pinia'
import { useForumStore } from './ForumStore'
import { useUserStore } from './UserStore'
export const useThreadStore = defineStore('ThreadStore', {
	state: () => ({ threads: [] }),
	getters: {
		findById(state) {
			return (id) => state.threads.find((thread) => thread.id === id)
		},
		filterByForumId(state) {
			return (id) => state.threads.filter((thread) => thread.forumId === id)
		},
		filterByUserId(state) {
			return (id) => state.threads.filter((thread) => thread.userId === id)
		},
		thread() {
			return (id) => {
				const thread = this.findById(id)
				return {
					...thread,
					get author() {
						return useUserStore().findById(thread.userId)
					},
					get repliesCount() {
						return thread.posts.length
					},
					get contr() {
						return thread.contributors.length
					},
				}
			}
		},
		lastThread() {
			return (forumId) => {
				const threads = this.filterByForumId(forumId)
				if (threads.length > 0) {
					const thread = threads[threads.length - 1]
					const originalThread = { ...thread }
					return {
						...originalThread,
						get author() {
							return useUserStore().findById(originalThread.userId)
						},
					}
				} else {
					return null
				}
			}
		},
	},
	actions: {
		setNewThread(thread) {
			thread.id = 'ggggnt' + Math.random()
			this.threads.push(thread)
			const forum = useForumStore().findById(thread.forumId)
			forum.threads.push(thread.id)
		},
		updateThread(thread, newTitle) {
			const index = this.threads.findIndex((t) => t.id === thread.id)
			if (index !== -1) {
				this.threads[index] = { ...thread, title: newTitle }
			} else {
				this.threads.push(thread)
			}
		},
	},
})
