<script setup>
import { ref, computed } from 'vue'
import { contactSchema } from '@/validations/schemas.js'
import { useForm } from 'vee-validate'
const submitted = ref(false)
const { defineField, handleSubmit, errors, validate } = useForm({
	validationSchema: contactSchema,
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [subject, subjectAttrs] = defineField('subject')
const [message, messageAttrs] = defineField('message')

const onSubmit = handleSubmit(async (values) => {
	const { valid } = await validate()
	if (valid) {
		console.log(values)
		submitted.value = true
	}
})
</script>

<template>
	<div class="c-page z-page">
		<div class="container">
			<section class="c-info"></section>
			<section class="c-form">
				<div class="photo noneLS">
					<img src="/static/contact/contact.png" alt="Contact us" />
				</div>
				<div class="col2">
					<div class="heading">
						<h2>Get in Touch</h2>
						<p>
							If you have any questions or need help, please fill out the form below. We do our best
							to respond within 1 business day.
						</p>
					</div>
					<form @submit.prevent="onSubmit">
						<BI
							class="c-input"
							nom="name"
							placeholder="Your Name"
							v-model="name"
							v-bind="nameAttrs"
							:errorMessage="errors.name"
						/>
						<BI
							class="c-input"
							type="email"
							nom="email"
							placeholder="Your email address"
							v-model="email"
							v-bind="emailAttrs"
							:errorMessage="errors.email"
						/>
						<BI
							class="c-input"
							nom="subject"
							placeholder="Subject"
							v-model="subject"
							v-bind="subjectAttrs"
							:errorMessage="errors.subject"
						/>
						<BI
							class="c-input"
							:nom="message"
							:isTextarea="true"
							placeholder="Message"
							v-model="message"
							v-bind="messageAttrs"
							:errorMessage="errors.message"
						/>
						<button type="submit">Send <i class="fa-solid fa-paper-plane"></i></button>
					</form>
					<div v-show="submitted" class="message">
						<p>Thank you your message has been recieved</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<style lang="scss">
.c-page {
	@include zflex;
	padding-top: 48px;
	padding-bottom: 48px;
	.container {
		.c-form {
			@include zflex;
			flex-direction: row-reverse;
			.photo {
				max-width: 420px;
				padding: 16px;
			}
			.col2 {
				min-width: 300px;
				@include zflex;
				flex-direction: column;
				.heading {
					h2 {
						margin: 16px 0;
						text-align: center;
						@include zfont(2.25rem, 500, #5e5e5e);
					}
					p {
						@include zfont(1.75rem, 400, #666);
						line-height: 1.25;
						text-align: center;
						max-width: $smS;
					}
				}

				form {
					max-width: $smS;
					width: 100%;
					padding: 0 16px;
					@include zflex(column, nowrap, center, center);
					.c-input {
						border-radius: 8px;
						padding: 16px;
						@include zfont(1.25rem, normal, $dark);
					}
					button {
						margin-top: 16px;
						@include zfont(1.25rem, normal, #fff);
						@include zbtn($bluclr, 12px 40px);
						i {
							padding-left: 8px;
						}
					}
				}
			}
		}
	}
}
</style>
