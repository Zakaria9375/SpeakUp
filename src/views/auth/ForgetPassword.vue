<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore.js'
import { forgetPasswordSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'

const { defineField, handleSubmit, errors, validate } = useForm({
	validationSchema: forgetPasswordSchema,
})
const [email, emailAttrs] = defineField('email')
const authStore = useAuthStore()
const onSubmit = handleSubmit(async (values) => {
	const { valid } = await validate()
	if (valid) {
		console.log(values)
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
						class="specialInput"
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
				.specialInput {
					border-radius: 8px;
					@include more($xsmS) {
						height: 45px;
						input {
							border-bottom-right-radius: 0px;
							border-top-right-radius: 0px;
						}
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
