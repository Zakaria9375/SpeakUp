<script setup>
import { passwordRecovery } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { account } from '@/config/AppWrite.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { defineField, handleSubmit, errors, validate } = useForm({
	validationSchema: passwordRecovery,
})
const [newPassword, newPasswordAttrs] = defineField('newPassword')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const isReady = ref(false)
const updating = ref(false)
const userId = ref('')
const token = ref('')

const recreatePassword = handleSubmit(async (values) => {
	const { valid } = await validate()
	if (valid) {
		close()
		updating.value = true
		const promise = account.updateRecovery(
			userId.value,
			token.value,
			values.newPassword,
			values.confirmPassword
		)
		promise.then(
			(res) => {
				console.log('password recover: sccuess', res)
				updating.value = false
				isReady.value = true
				setTimeout(() => router.push({ name: 'login' }), 500)
			},
			(err) => {
				updating.value = false
				console.log('password recover: error', err)
			}
		)
	}
})
onMounted(() => {
	userId.value = route.query.userId
	token.value = route.query.secret
})
</script>

<template>
	<div v-show="!updating" class="z-page recover p-16">
		<div v-if="!isReady" class="container">
			<div class="photo1 noneMedS">
				<img src="/static/forget/reset.png" alt="new massage" />
			</div>
			<form @submit.prevent="recreatePassword">
				<h2 class="tito2">Password Reset</h2>
				<BI
					type="password"
					title="New Password"
					nom="newPassword"
					v-model="newPassword"
					v-bind="newPasswordAttrs"
					:errorMessage="errors.newPassword"
				/>
				<BI
					type="password"
					title="Confirm Password"
					nom="confirmPassword"
					v-model="confirmPassword"
					v-bind="confirmPasswordAttrs"
					:errorMessage="errors.confirmPassword"
				/>
				<div class="form-act">
					<button type="submit" class="blu-sm-btn">Submit</button>
				</div>
			</form>
		</div>
		<div class="container" v-else>
			<div class="photo1 noneMedS">
				<img src="/static/forget/updated.png" alt="new massage" />
			</div>
			<p class="v-text">Your password has been updated...</p>
		</div>
	</div>
	<AppLoading v-show="updating" />
</template>

<style lang="scss">
.recover {
	@include zflex;
	.container {
		@include zflex;
		gap: 3%;
		.photo1 {
			max-width: 450px;
			@include less($lS) {
				max-width: 400px;
			}
		}
		form {
			flex: 1;
			min-width: 280px;
			max-width: 480px;
			padding: 16px;
			.tito2 {
				color: #333;
				@include zfont(2.5rem, 500, #333);
				text-align: center;
			}
			margin-bottom: 54px;
		}
		.v-text {
			font-size: 2rem;
		}
	}
}
</style>
