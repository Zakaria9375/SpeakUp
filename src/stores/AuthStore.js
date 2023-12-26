import { defineStore } from 'pinia'
import { account, databases } from '@/config/AppWrite.js'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import { ID } from 'appwrite'
import router from '@/router'
export const useAuthStore = defineStore('AuthStore', () => {
	const appwriteErr = ref('')
	const loggedIn = useLocalStorage('loggedIn', false)
	function displayErr(error) {
		console.log(error)
		appwriteErr.value = `${error}`
	}
	function updateLastLoginTime(response) {
		let id = response.userId
		let lastLoginTime = new Date().toISOString()
		databases.updateDocument('appData', 'users', id, {
			lastVisitAt: lastLoginTime,
		})
	}
	function login(data) {
		const promise = account.createEmailSession(data.email, data.password)
		promise.then(
			function (response) {
				loggedIn.value = true
				updateLastLoginTime(response)
				router.push({ name: 'home' })
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	function logout() {
		const promise = account.deleteSession('current')
		promise.then(
			function (response) {
				loggedIn.value = false
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	function createNewUser(data) {
		const promise = account.create(ID.unique(), data.email, data.password, data.fullName)
		promise.then(
			function (response) {
				const theUser = {
					fullName: data.fullName,
					username: data.userName,
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					registeredAt: response.$createdAt,
				}
				databases.createDocument('appData', 'users', response.$id, {
					...theUser,
				})
				router.push({ name: 'login' })
			},
			function (error) {
				displayErr(error)
			}
		)
	}
	return {
		loggedIn,
		appwriteErr,
		createNewUser,
		login,
		logout,
	}
})
