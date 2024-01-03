<script setup>
import AccountCard from '@/components/account/AccountCard.vue'
import { useAccountStore } from '@/stores/AccountStore.js'
import { ref } from 'vue'
const props = defineProps({
	fullName: { type: String, required: true },
})
const accountStore = useAccountStore()
const form = ref({
	fullName: props.fullName,
})
function saveName() {
	const data = {
		fullName: form.value.fullName
	}
	accountStore.editName(data)
}
</script>

<template>
	<div class="account-name">
		<AccountCard @saving="saveName">
			<template #display>
				<div class="dis-name">
					<span>Name</span>
					<p>{{ fullName }}</p>
				</div>
			</template>
			<template #edit>
				<BI title="Full name" nom="fullName" v-model="form.fullName" />
			</template>
		</AccountCard>
	</div>
</template>
<style lang="scss">
.account-name {
	.display {
		@include zflex(row, wrap, space-between);

		.dis-name {
			@include zflex(row, wrap);
			padding-right: 16px;
			span {
				@include zfont(1.25rem, 500, $gra2clr);
				margin-right: 16px;
			}
			p {
				@include zfont(1.5rem, 500, $dark);
			}
		}
	}
}
</style>
