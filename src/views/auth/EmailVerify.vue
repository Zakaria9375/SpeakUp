<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { account } from '@/config/appwrite.js'
const router = useRouter()
const route = useRoute()
const verified = ref(false)
function verifyEmail(userId, token) {
	const promise = account.updateVerification(userId, token)
	promise.then(
		(response) => {
			console.log(response)
			verified.value = true
			setTimeout(() => router.push({ name: 'login' }), 1000)
		},
		(error) => {
			console.log(error)
		}
	)
}
onMounted(() => {
	const userId = route.query.userId
	const token = route.query.secret
	verifyEmail(userId, token)
})
</script>
<template>
	<AppLoading v-if="!verified" />
	<div v-else class="z-page v-page">
		<div class="container">
			<div class="photo">
				<img src="/static/email/confirmed.png" alt="verified email" />
			</div>
			<p class="v-text">Your acccount has been Verified</p>
		</div>
	</div>
</template>
<style lang="scss">
.v-page {
	@include zflex(column);
	.container {
		@include zflex(column);
		.photo {
			max-width: 350px;
		}
		.v-text {
			@include zfont(2rem, 500, #666);
		}
	}
}
</style>
