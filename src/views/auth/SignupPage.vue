<script setup>
import { ref, computed } from 'vue'
import { useAccDbStore } from '@/stores/AccDbStore.js'
import { registerSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'

const { defineField, handleSubmit, errors, validate } = useForm({
	validationSchema: registerSchema,
})

const AccDbStore = useAccDbStore()
const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const outputErr = computed(() => AccDbStore.registerErr)

const theFullName = computed(() => {
	return firstName.value.trim() + ' ' + lastName.value.trim()
})
const theUserName = computed(() => {
	const nameRef =
		firstName.value.toLowerCase().trim() +
		lastName.value.toLowerCase().trim() +
		Math.floor(Math.random() * 1000)
	return nameRef
})

const onSubmit = handleSubmit(async (values) => {
	const { valid } = await validate()
	if (valid) {
		const userName = theUserName.value
		const fullName = theFullName.value
		const data = {
			userName,
			fullName,
			...values,
		}
		AccDbStore.createAccUser(data)
	}
})
</script>

<template>
	<div class="z-page z-clr sign-page">
		<div class="container">
			<div class="signup-container">
				<div class="sp-heading">
					<h1>Sign Up</h1>
					<p>Join Us Today!</p>
				</div>
				<form @submit.prevent="onSubmit" class="signup-form">
					<BI
						type="text"
						title="First name"
						nom="firstName"
						v-model="firstName"
						v-bind="firstNameAttrs"
						:errorMessage="errors.firstName"
					/>
					<BI
						type="text"
						title="Last name"
						nom="lastName"
						v-model="lastName"
						v-bind="lastNameAttrs"
						:errorMessage="errors.lastName"
					/>
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
					<BI
						type="password"
						title="Confirm Password"
						nom="confirmPassword"
						v-model="confirmPassword"
						v-bind="confirmPasswordAttrs"
						:errorMessage="errors.confirmPassword"
					/>
					<button type="submit" class="signup">Sign Up</button>
				</form>
				<div class="error-message" v-if="outputErr">{{ outputErr }}</div>
				<p class="sign-link">
					Already have an account?
					<router-link to="/login" title="Do you have an account?!" class="link"
						>Log in</router-link
					>
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.sign-page {
	.container {
		padding-top: 24px;
		.signup-container {
			margin: 0 auto;
			max-width: 400px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.signup-form {
				padding: 20px;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				h2 {
					text-align: center;
					color: #333;
				}

				.signup {
					@include zbtn;
					@include zfont(1.2rem, 600, #fff);
					.link {
						display: inline;
					}
				}
			}
			.sign-link {
				@include zfont(1.15rem, 400, $dark);
				margin-bottom: 32px;
				.link {
					@include zfont(1.25rem, 500, $bluclr);
					display: inline;
				}
			}
		}
	}
}
</style>
