import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases, account } from '@/config/AppWrite.js'

import { executeOperation, getDocument } from '@/stores/helper'
export const useAccDbStore = defineStore('accDbStore', () => {
	const authId = ref('')
	const accUser = ref({})
	const dbUser = ref({})
	const registerErr = ref('')
	const getAccUser = async () => {
		const accRes = await executeOperation(
			account.get(),
			'AccDb: Fetched accUser successfully',
			'AccDb: Account Not Found'
		).then((response) => {
			authId.value = response.$id
			accUser.value = response
			return response
		})
		const dbRes = await getDocument(
			dbUser,
			'users',
			accRes.$id,
			'AccDb: Fetched dbUser successfully'
		)
		return { accRes, dbRes }
	}
	function createAccUser(data) {
		const operation = account.create(ID.unique(), data.email, data.password, data.fullName)
		return executeOperation(operation, 'Account Created', 'Account Creation Failed').then(
			(response) => {
				const databaseUser = {
					fullName: data.fullName,
					email: data.email,
					registeredAt: response.$createdAt,
				}
				databases.createDocument('appData', 'users', response.$id, {
					...databaseUser,
				})
				router.push({ name: 'login' })
			},
			(err) => (registerErr.value = err)
		)
	}
	return { authId, accUser, dbUser, registerErr, createAccUser, getAccUser, }
})
