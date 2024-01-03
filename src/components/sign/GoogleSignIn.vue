<script setup>
import { account } from '@/config/AppWrite.js'

const signWithGoogle = async () => {
	try {
		await account.createOAuth2Session(
			'google',
			'http://localhost:5173/google-login-success',
			'http://localhost:5173/login'
		)
	} catch (error) {
		console.log(error)
	}
}
</script>

<template>
	<div>
		<button type="button" class="nobtn google-btn" @click="signWithGoogle">
			<img src="/static/signIn/google.png" alt="google" /> Continue with Google
		</button>
	</div>
</template>
