import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore.js'
import { account, databases } from '@/config/AppWrite.js'
import { ref } from 'vue'
export const useUserStore = defineStore('userStore', () => {
	const authId = ref('')
	const authUser = ref({})
	const userdb = ref({})
	const appwriteErr = ref('')
	function displayErr(error) {
		console.log(error)
		appwriteErr.value = `${error}`
	}
	function getAuthUser() {
			const promise = account.get()
			promise.then(
				function (response) {
					authUser.value = response
					authId.value = response.$id
					const promisedb = databases.getDocument('appData', 'users', response.$id)
					promisedb.then(
						function (res) {
							userdb.value = res
						},
						function (error) {
							displayErr(error)
						}
					)
					console.log(response) // Success
				},
				function (error) {
					displayErr(error)
				}
			)
		
	}
	return { authId, authUser, userdb, getAuthUser }
})
