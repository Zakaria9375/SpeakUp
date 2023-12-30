<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore.js'
import { loginSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router';

const { meta, defineField, handleSubmit, errors } = useForm({ validationSchema: loginSchema })

const authStore = useAuthStore()
const outputErr = computed(() => authStore.loginErr)

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const router = useRouter()
const onSubmit = handleSubmit((values) => {
	authStore.login(values)
})
onMounted(() => {
	if(authStore.loggedIn) {
		router.push({name: 'home'})
	}
})
</script>

<template>
	<div class="login-page z-page z-clr">
		<div class="container">
			<div v-if="!authStore.loggedIn" class="login-container">
				<div class="sp-heading">
					<h1>Sign In</h1>
					<p>Login to Your Account</p>
				</div>
				<form @submit.prevent="onSubmit" class="login-form">
					<BI
						type="email"
						title="Email"
						nom="email"
						v-model="email"
						v-bind="emailAttrs"
						:errorMessage="errors.email"
					/>
					<BI
						type="password"
						title="Password"
						nom="password"
						v-model="password"
						v-bind="passwordAttrs"
						:errorMessage="errors.password"
					/>
					<router-link
						:to="{ name: 'forgetPass' }"
						class="link"
						title="Did you forget your password?!"
						>Forget password ?!</router-link
					>
					<button type="submit" class="login">Login</button>
				</form>

				<div class="error-message" v-if="outputErr">{{ outputErr }}</div>

				<router-link :to="{ name: 'register' }" class="create">Create new account</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.login-page {
	.container {
		padding-top: 24px;
		padding-bottom: 30px;
		.login-container {
			margin: 16px auto;
			max-width: 400px;
			display: flex;
			flex-direction: column;
			align-items: center;
			h2 {
				text-align: center;
				color: #333;
			}
			.login-form {
				padding: 20px;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.link {
					padding: 12px;
					margin-bottom: 16px;
					@include zfont(1.2rem, 500, $bluclr);
				}

				.login {
					@include zbtn;
					@include zfont(1.2rem, 600, #fff);
				}
			}
			.create {
				@include zfont(1.2rem, 600, $bluclr);
				padding: 12px;
				width: 80%;
				margin-top: 12px;
				border-radius: 10px;
				text-align: center;
				&:hover {
					background-color: $bluhclr;
					color: #fff;
				}
			}
		}
	}
}
</style>
