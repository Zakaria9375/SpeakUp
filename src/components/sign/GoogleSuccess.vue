<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore.js'
import { useUserStore } from '@/stores/UserStore.js'
import { account, updateUserStatus, databases } from '@/config/AppWrite.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()
onMounted(async () => {
	authStore.onLoginSuccess()
	const session = await account.getSession('current')
	const exist = await userStore.isUserExist(session.userId)
	if (exist) {
		updateUserStatus(session.userId, true)
		setTimeout(() => router.push({ name: 'home' }), 1000)
	} else {
		const user = await account.get()
		const databaseUser = {
			fullName: user.name,
			email: user.email,
			registeredAt: user.$createdAt,
		}
		await databases.createDocument('appData', 'users', user.$id, {
			...databaseUser,
		})
		setTimeout(() => router.push({ name: 'home' }), 1000)
	}
})
</script>

<template>
	<AppLoading />
</template>
