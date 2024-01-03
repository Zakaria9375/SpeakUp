<script setup>
import { useToggle } from '@/composables/toggle.js'
import { ref } from 'vue'
import { account } from '@/config/AppWrite.js'
const { refValue, open, close } = useToggle()
const updating = ref(false)
</script>

<template>
	<div class="acc-card">
		<h2 class="card-title">Devices</h2>
		<div class="card-icon">
			<img src="/static/account/device.png" alt="Icon" />
		</div>
		<div class="card-content">
			<p>Review your logged in devices.</p>
			<button type="button" @click="open" class="nobtn">Manage Devices ></button>
		</div>
	</div>
	<PopUp class="del-main" v-if="refValue" @close="close">
		<div class="msg">
			<p>This Feature will be implemented soon...</p>
		</div>
	</PopUp>
</template>
<style lang="scss">

.msg {
	padding: 16px;
	p {
		text-align: center;
		@include zfont(1.5rem, 400, #333)
	}
}
</style>
