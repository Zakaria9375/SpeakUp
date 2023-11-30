import { defineStore } from 'pinia'
import { usePostStore } from '@/stores/PostStore';
import { useThreadStore } from '@/stores/ThreadStore';

export const useUserStore = defineStore('UserStore', {
	state: () => ({ 
		users: [],
		authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
	}),
  getters: {
		findById(state) {
			return id => state.users.find(user => user.id === id)
		},
		authUser(state){
			const user = this.findById(this.authId)
			return {
				...user,
				get posts(){
					return usePostStore().filterByUserId(state.authId)
				},
				get threads(){
					return useThreadStore().filterByUserId(state.authId)
				},
				get postsCount(){
					return this.posts.length
				},
				get threadsCount(){
					return this.threads.length
				}
			}
		},
		
  },
	actions: {	
		updateAuthUser(source){
			const targetUser  = this.findById(this.authId)
			Object.assign(targetUser, source)
			console.log(targetUser)
			this.users.push(targetUser)
		}
	}
})