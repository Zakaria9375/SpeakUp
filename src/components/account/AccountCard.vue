<script setup>
import { ref } from 'vue'
const emit = defineEmits(['saving', 'verify'])
const { verify } = defineProps({ verify: { type: Boolean, default: false } })
const isEditing = ref(false)

const edit = () => {
	isEditing.value = true
}

const save = (e) => {
	emit('saving', e)
	isEditing.value = false
}

const cancel = () => {
	isEditing.value = false
}
</script>

<template>
	<div class="account-card">
		<!-- Display Email and Edit Button -->
		<div v-if="!isEditing" class="display">
			<slot name="display"></slot>

			<div class="form-act">
				<button type="button" v-if="verify" @click="emit('verify')" class="gh-btn">Verify</button>
				<button type="button" @click="edit" class="blu-sm-btn">Edit</button>
			</div>
		</div>

		<!-- Display Edit Form -->
		<div v-else class="editing">
			<form @submit.prevent="save">
				<slot name="edit"></slot>

				<div class="form-act">
					<button type="button" @click="cancel" class="gh-btn">Cancel</button>
					<button type="submit" class="blu-sm-btn">Save</button>
				</div>
			</form>
		</div>
	</div>
</template>
<style scop lang="scss">
.account-card {
	margin-top: 16px;
	padding-bottom: 16px;
	border-bottom: 0.5px solid $webD;
	margin-bottom: 16px;
}
</style>
