<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore.js'
import { loginSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import GoogleSignIn from '@/components/sign/GoogleSignIn.vue'

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
	if (authStore.loggedIn) {
		router.push({ name: 'home' })
	}
})
</script>

<template>
	<div class="login-page z-page z-clr p-16">
		<div class="container">
			<div class="sp-heading noneMedS">
				<h1>Sign In</h1>
				<p>Login to Your Account</p>
			</div>
			<div class="login-container">
				<GoogleSignIn/>
				<form @submit.prevent="onSubmit" class="login-form">
					<h4 class="title">or Login with your credentials</h4>
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
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.login-page {
	@include zflex(column);
	.container {
		@include zflex;
		gap: 5%;
		.login-container {
			max-width: 400px;
			flex: 1;
			@include zflex(column);

			.login-form {
				.title {
					@include zfont(1.375rem, 500, #777);
					margin: 0;
					padding: 16px 0;
				}
				padding: 16px;
				width: 100%;
				@include zflex(column);
				.link {
					padding: 10px;
					margin-bottom: 16px;
					@include zfont(1.2rem, 500, $bluclr);
				}
				.login {
					@include zbtn;
					@include zfont(1.2rem, 600, #fff);
				}
			}
		}
	}
}
</style>
