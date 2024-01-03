import { defineStore } from 'pinia'
import { account, databases } from '@/config/AppWrite.js'
import { ref } from 'vue'
import { executeOperation } from '@/stores/helper'
import { useAuthStore } from '@/stores/AuthStore'


export const useAccountStore = defineStore('accountStore', () => {
	const editName = (data) => {
		return executeOperation(
			account.updateName(data.fullName),
			'editName: account name edited sccuessfully',
			'editName: account error while editing'
		).then((res) => {
			console.log(res)
			databases.updateDocument('appData', 'users', res.$id, { ...data })
		})
	}
	const editEmail = (data) => {
		const email = data.email
		const password = data.password
		return executeOperation(
			account.updateEmail(email, password),
			'editEmail: account email edited sccuessfully',
			'editEmail: account email error while editing'
		).then((res) => {
			console.log(res)
			databases.updateDocument('appData', 'users', res.$id, { email: email })
		})
	}
	const editPhone = (data) => {
		const phone = data.phone
		const password = data.password
		return executeOperation(
			account.updatePhone(phone, password),
			'editPhone: account phone edited sccuessfully',
			'editPhone: account phone error while editing'
		).then((res) => {
			console.log(res)
			databases.updateDocument('appData', 'users', res.$id, { phone: phone })
		})
	}
	const deleteAccount = (id) => {
		const authStore = useAuthStore()
		authStore.logout(id)
		account.delete(id)
	}
	return { editName, editEmail, editPhone, deleteAccount }
})
