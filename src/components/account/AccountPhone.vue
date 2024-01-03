<script setup>
import AccountCard from '@/components/account/AccountCard.vue'
import { useAccountStore } from '@/stores/AccountStore.js'
import { ref } from 'vue'
import { useToggle } from '@/composables/toggle.js'
import { account } from '@/config/appwrite.js'

const props = defineProps({
	phone: { type: String, required: false, default: '' },
	status: { type: Boolean, required: true },
})
const accountStore = useAccountStore()
const { refValue: verifyRefP, open: verifyOpenP, close: verifyCloseP } = useToggle()

const form = ref({
	phone: props.phone,
	password: '',
})
const secretV = ref('')
function editPhone() {
	const data = { ...form.value }
	accountStore.editPhone(data)
}
const userId = ref(null)

function verifyPhone() {
	verifyOpenP()
	const prom = account.createPhoneVerification()
	prom.then((res) => (userId.value = res.userId))
}
function onPhoneVerify() {
	const secret = secretV.value
	const id = userId.value
	const prom = account.updatePhoneVerification(id, secret)
	prom.then((res) => console.log('phone verify success', res))
	verifyCloseP()
}
</script>

<template>
	<div class="account-phone">
		<AccountCard :verify="!status" @saving="editPhone" @verify="verifyPhone">
			<template #display>
				<div class="display-info">
					<div class="dis-name">
						<span>phone</span>
						<p>{{ phone }}</p>
					</div>
					<p class="status">{{ status ? 'Verified' : 'Not Verified' }}</p>
				</div>
			</template>
			<template #edit>
				<BI
					type="text"
					placeholder="+37100012345"
					required
					title="Phone"
					nom="phone"
					v-model="form.phone"
				/>
				<p class="helper">Country code with a leading + is a must</p>
				<BI type="password" required title="Password" nom="password" v-model="form.password" />
				<p class="helper">Password is Required for your own security</p>
			</template>
		</AccountCard>
		<PopUp class="del-main" v-if="verifyRefP" @close="verifyCloseP">
			<div class="phone-verify">
				<form @submit.prevent="onPhoneVerify">
					<BI
						type="password"
						required
						title="SMS Pin Code"
						nom="token"
						v-model="secretV"
						placeholder="######"
					/>
					<p class="helper">Please, enter the code you have recieved</p>

					<div class="form-act">
						<button type="button" @click="verifyCloseP" class="gh-btn">Cancel</button>
						<button type="submit" class="blu-sm-btn">Confirm</button>
					</div>
				</form>
			</div></PopUp
		>
	</div>
</template>
<style lang="scss"></style>
