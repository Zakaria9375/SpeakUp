import { defineStore } from 'pinia'
import { getDocument, createDocument, updateDocument, deleteDocument } from '@/stores/helper'

export const useForumStore = defineStore('forumStore', () => {
	const getForum = (refVal, docID) => {
		return getDocument(refVal, 'forums', docID, 'FS: Fetched forum successfully')
	}

	const createForum = (forum) => {
		return createDocument('forums', forum, 'FS: Forum created successfully')
	}

	const updateForum = (forumId, updatedData) => {
		return updateDocument('forums', forumId, updatedData, 'FS: Forum updated successfully')
	}

	const deleteForum = (forumId) => {
		return deleteDocument('forums', forumId, 'FS: Forum deleted successfully')
	}

	return {
		getForum,
		createForum,
		updateForum,
		deleteForum,
	}
})
