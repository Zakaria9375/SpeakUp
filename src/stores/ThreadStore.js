import { defineStore } from 'pinia'
import { databases } from '@/config/AppWrite.js'
import {
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
	executeOperation,
} from '@/stores/helper'
import { Query } from 'appwrite'

export const useThreadStore = defineStore('threadStore', () => {
	const getThread = (refVal, docID) => {
		return getDocument(refVal, 'threads', docID, 'TS: Fetched thread successfully')
	}

	const createThread = (thread) => {
		return createDocument('threads', thread, 'TS: Thread created successfully')
	}

	const updateThread = (threadId, updatedData) => {
		return updateDocument('threads', threadId, updatedData, 'TS: Thread updated successfully')
	}

	const deleteThread = (threadId) => {
		return deleteDocument('threads', threadId, 'TS: Thread deleted successfully')
	}

	const lastThread = async (refVal, id) => {
		const operation = databases.listDocuments('appData', 'threads', [
			Query.equal('forum', id),
			Query.orderDesc('$createdAt'),
			Query.limit(1),
		])
		return await executeOperation(operation, 'TS: last thread').then((response) => {
			if (response) refVal.value = response.documents[0]
		})
	}
	const getThreadsByUserId = async (refVal, userId) => {
		const operation = databases.listDocuments('appData', 'threads', [
			Query.equal('madeBy', userId),
			Query.orderDesc('$createdAt'),
		])
		return await executeOperation(operation, 'PS: threads by userId').then((response) => {
			if (response) refVal.value = response.documents
		})
	}
	return {
		getThread,
		createThread,
		updateThread,
		deleteThread,
		lastThread,
		getThreadsByUserId,
	}
})
