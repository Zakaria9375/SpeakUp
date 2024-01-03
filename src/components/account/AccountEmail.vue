<script setup>
import AccountCard from '@/components/account/AccountCard.vue'
import { useAccountStore } from '@/stores/AccountStore.js'
import { ref } from 'vue'
import { useToggle } from '@/composables/toggle.js'
import { account } from '@/config/appwrite.js'
const props = defineProps({
	email: { type: String, required: true },
	status: { type: Boolean, required: true },
})
const accountStore = useAccountStore()
const form = ref({
	email: props.email,
	password: '',
})

const { refValue: verifyRefE, open: verifyOpenE, close: verifyCloseE } = useToggle()
function editEmail() {
	const data = { ...form.value }
	accountStore.editEmail(data)
}
function verifyEmail() {
	verifyOpenE()
	const promise = account.createVerification('https://speak-up.zaportfolio.com/verify-email')
	promise.then((res) => console.log('Email verify created', res))
}
</script>

<template>
	<div class="account-phone account-email">
		<AccountCard :verify="!status" @saving="editEmail" @verify="verifyEmail">
			<template #display>
				<div class="display-info">
					<div class="dis-name">
						<span>email</span>
						<p>{{ email }}</p>
					</div>
					<p class="status">{{ status ? 'Verified' : 'Not Verified' }}</p>
				</div>
			</template>
			<template #edit>
				<BI type="email" required title="email" nom="email" v-model="form.email" />
				<BI type="password" required title="Password" nom="password" v-model="form.password" />
				<p class="helper">Password is Required for your own security</p>
			</template>
		</AccountCard>
	</div>
	<PopUp class="del-main" v-if="verifyRefE" @close="verifyCloseE">
		<div class="photo">
			<img src="/static/forget/msg-o.png" alt="new massage" />
		</div>
		<p class="v-text">
			An email has been sent to you. Please, check your email to complete verification process.
		</p>
	</PopUp>
</template>
<style lang="scss"></style>
