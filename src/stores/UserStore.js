import { defineStore } from 'pinia'
import {
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
} from '@/stores/helper'

export const useUserStore = defineStore('userStore', () => {
	const getUser = (refVal, userId) => {
		return getDocument(refVal, 'users', userId, 'US: Fetched user successfully')
	}
	return { getUser }
})
