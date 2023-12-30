import { defineStore } from 'pinia'
import { client } from '@/config/AppWrite'

export const useRealtime = defineStore('realtime', () => {
	const unsubscribe = (colId, docId) => {
		client.subscribe(
			`databases.appData.collections.${colId}.documents.${docId}`,
			(response) => {
				console.log(response)
				return response.payload
			})
	} 
	client.subscribe(
			`databases.appData.collections.posts.documents`,
			(response) => {
				console.log(response)
				return response.payload
			})

	return {  }
})
