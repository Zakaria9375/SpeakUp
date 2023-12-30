import { defineStore } from 'pinia'
import { databases } from '@/config/AppWrite.js'
import { ref } from 'vue'
import { Query } from 'appwrite'
import router from '@/router'
import { ID } from 'appwrite'
import { useAsyncState } from '@vueuse/core'
import { client } from '@/config/AppWrite'

export const useDataStore = defineStore('dataStore', () => {
	const categories = ref([])
	const appwriteErr = ref('')
	function displayErr(error) {
		console.log(error)
		appwriteErr.value = `${error}`
	}
	function getCollection(col, colID) {
		const promise = databases.listDocuments('appData', colID)
		promise.then(
			function (response) {
				col.value = response.documents
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	const getCategories = () => getCollection(categories, 'categories')
	function getDoc(colID, docID) {
		const { state, isReady, isLoading, error } = useAsyncState(
			databases.getDocument('appData', colID, docID).then((response) => {
				return response
			}),
			null,
			{
				onError: (e) => {
					displayErr(e)
				},
			}
		)
		return { state, isReady, isLoading, error }
	}
	
	function lastThread(id) {
		const { state, isReady, isLoading, error } = useAsyncState(
			databases
				.listDocuments('appData', 'threads', [
					Query.equal('forum', id),
					Query.orderDesc('$createdAt'),
					Query.limit(1),
				])
				.then((response) => {
					return response.documents[0]
				}),
			null,
			{
				onError: (e) => {
					displayErr(e)
				},
			}
		)

		return { state, isReady, isLoading, error }
	}
	//create and update methods
	function createThread(thread) {
		const promise = databases.createDocument('appData', 'threads', ID.unique(), {...thread})
		promise.then(
			function (response) {
				console.log(response) // Success
				router.push({ name: 'forum', params: { id: thread.forum.$id } })
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	async function updateThreadPost(loading, postId, updatedPost, threadId, updatedThread) {
		loading.value = true
		try {
			await databases.updateDocument('appData', 'threads', threadId, {
				...updatedThread,
			})
			await databases.updateDocument('appData', 'posts', postId, {
				...updatedPost,
			})
			router.push({ name: 'thread', params: { id: threadId } })
		} catch (error) {
			displayErr(error)
		}
	}
	const createPost = (post) => {
		const promise = databases.createDocument('appData', 'posts', ID.unique(), { ...post })
		promise.then(
			function (response) {
				console.log(response) // Success
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	function updateThread(threadId, updatedThread) {
		const { state, isReady, isLoading, error } = useAsyncState(
			databases
				.updateDocument('appData', 'threads', threadId, { ...updatedThread })
				.then((response) => {
					return response
				}),
			null,
			{
				onError: (e) => {
					displayErr(e)
				},
			}
		)
		return { state, isReady, isLoading, error }
	}
	function updatePost(postId, updatedPost) {
		const { state, isReady, isLoading, error } = useAsyncState(
			databases
				.updateDocument('appData', 'posts', postId, { ...updatedPost })
				.then((response) => {
					return response
				}),
			null,
			{
				onError: (e) => {
					displayErr(e)
				},
			}
		)
		return { state, isReady, isLoading, error }
	}
	return {
		categories,
		lastThread,
		getCollection,
		getCategories,
		getDoc,
		createThread,
		updateThreadPost,
		createPost,
		updatePost,
		updateThread,
		appwriteErr,
	}
})
