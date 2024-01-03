<script setup>
import { ref } from 'vue'
import { forgetPasswordSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'
import { account } from '@/config/AppWrite.js'
import { useToggle } from '@/composables/toggle.js'
const { refValue: msgPop, open: openMsg, close: closeMsg } = useToggle()
const { defineField, handleSubmit, errors, validate } = useForm({
	validationSchema: forgetPasswordSchema,
})
const [email, emailAttrs] = defineField('email')
const onSubmit = handleSubmit(async (values) => {
	const { valid } = await validate()
	if (valid) {
		const emailValue = values.email
		openMsg()
		const promise = await account.createRecovery(
			emailValue,
			'https://speak-up.zaportfolio.com/password-recovery'
		)
		promise.then(
			(res) => {
				console.log('password-recovery success', res)
			},
			(err) => {
				console.log('password-recovery error', err)
			}
		)
	}
})
</script>
<template>
	<div class="fp-page z-page z-clr">
		<div class="container z-page">
			<div class="photo noneLS">
				<img src="/static/forget/fpa.png" alt="forget password amigo" />
			</div>
			<div class="col2">
				<div class="heading">
					<h2>Forget Your Password?</h2>
					<p>No worries! Enter your email address, and we'll send you an email to reset it.</p>
				</div>
				<form @submit.prevent="onSubmit">
					<BI
						class="f-input"
						type="email"
						nom="email"
						v-model="email"
						v-bind="emailAttrs"
						:errorMessage="errors.email"
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	</div>
	<PopUp class="del-main" v-if="msgPop" @close="closeMsg">
		<div class="photo">
			<img src="/static/forget/msg-r.png" alt="new massage" />
		</div>
		<p class="v-text">
			An email has been sent to you. Please, check your email to complete verification process.
		</p>
	</PopUp>
</template>
<style lang="scss">
.fp-page {
	.container {
		@include zflex(row, nowrap, space-between, center);
		.photo {
			max-width: 600px;
		}
		.col2 {
			min-width: 300px;
			@include zflex(column, nowrap, center, center);
			.heading {
				h2 {
					margin: 16px 0;
					text-align: center;
					@include zfont(2.25rem, 500, #5e5e5e);
				}
				p {
					@include zfont(1.875rem, 400, #666);
					line-height: 1.35;
					text-align: center;
					max-width: $xlS;
				}
			}

			form {
				max-width: $smS;
				width: 100%;
				padding: 16px;
				@include zflex(row, nowrap, center, flex-start);
				@include less($xsmS) {
					@include zflex(column, nowrap, center, center);
				}
				.f-input {
					border-radius: 8px;
					@include more($xsmS) {
						height: 45px;
						border-bottom-right-radius: 0px;
						border-top-right-radius: 0px;
					}
				}
				button {
					@include zfont(1.15rem, normal, #fff);
					@include zbtn($greclr, 12px 16px);
					@include less($xsmS) {
						width: 80%;
					}
					@include more($xsmS) {
						border-bottom-left-radius: 0px;
						border-top-left-radius: 0px;
						margin-top: 8px;
					}
				}
			}
		}
	}
}
</style>
