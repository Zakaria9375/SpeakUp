import { defineStore } from 'pinia'
import { account, updateUserStatus } from '@/config/AppWrite.js'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import router from '@/router'
import { executeOperation } from '@/stores/helper'
import { useAccDbStore } from '@/stores/AccDbStore'
export const useAuthStore = defineStore('AuthStore', () => {
	const loginErr = ref('')
	const loggedIn = useLocalStorage('loggedIn', false)
	// function updateLastLoginTime(response) {
	// 	let id = response.userId
	// 	let lastLoginTime = new Date().toISOString()
	// 	databases.updateDocument('appData', 'users', id, {
	// 		lastVisitAt: lastLoginTime,
	// 	})
	// }
	function login(data) {
		const operation = account.createEmailSession(data.email, data.password)
		return executeOperation(operation, 'Login Successful', 'Login Failed').then(
			(res) => {
				updateUserStatus(res.userId, true)
				loggedIn.value = true
				useAccDbStore().getAccUser()
				router.push({ name: 'home' })
			}, (err) => loginErr.value = err
		)
	}
	function logout(id) {
		const operation = account.deleteSession('current')
		return executeOperation(operation, 'Logout Successful', 'Logout Failed').then(
			(res) => {
				updateUserStatus(id, false)
				loggedIn.value = false
				router.push({ name: 'welcome' })
			}
		)
	}
	
	return {
		loggedIn,
		loginErr,
		login,
		logout,
	}
})
