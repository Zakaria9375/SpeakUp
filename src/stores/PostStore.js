import { defineStore } from 'pinia'
import {
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
	executeOperation,
} from '@/stores/helper'
import { databases } from '@/config/AppWrite.js'
import { Query } from 'appwrite'

export const usePostStore = defineStore('postStore', () => {
	const getPost = (refVal, docID) =>
		getDocument(refVal, 'posts', docID, 'PS: Fetched post successfully')

	const createPost = (post) => createDocument('posts', { ...post }, 'PS: Post created successfully')

	const updatePost = (postId, updatedData) =>
		updateDocument('posts', postId, updatedData, 'PS: Post updated successfully')

	const deletePost = (postId) => deleteDocument('posts', postId, 'PS: Post deleted successfully')
	const getPostsByUserId = async (refVal, userId) => {
		const operation = databases.listDocuments('appData', 'posts', [
			Query.equal('madeBy', userId),
			Query.orderDesc('$createdAt'),
		])
		return await executeOperation(operation, 'PS: posts by userId').then((response) => {
			if (response) refVal.value = response.documents
		})
	}
	const getPostsByThreadId = async (refVal, threadId) => {
		const operation = databases.listDocuments('appData', 'posts', [
			Query.equal('threadId', threadId),
			Query.orderAsc('$createdAt'),
		])
		return await executeOperation(operation, 'PS: posts by threadId').then((response) => {
			if (response) refVal.value = response.documents
		})
	}
	return {
		getPost,
		createPost,
		updatePost,
		deletePost,
		getPostsByUserId,
		getPostsByThreadId,
	}
})
