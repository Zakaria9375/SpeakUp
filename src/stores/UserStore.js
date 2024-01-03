import { defineStore } from 'pinia'
import {
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
} from '@/stores/helper'
import { ref , computed } from 'vue'
export const useUserStore = defineStore('userStore', () => {
	const getUser = (refVal, userId) => {
		return getDocument(refVal, 'users', userId, 'US: Fetched user successfully')
	}
	const isUserExist = async (userId) => {
		const user = ref(null)
		await getDocument(user, 'users', userId, 'US: user exist')
		return user.value ? true : false
	}
	return { getUser, isUserExist }
})
