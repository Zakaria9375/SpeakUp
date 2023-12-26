<script setup>
import { vOnClickOutside } from '@vueuse/components'

const emit = defineEmits(['close'])
function close() {
	emit('close')
} 
</script>
<template>
	<div class="overlay">
		<div class="bg" v-on-click-outside="close">
			<div class="pop-head">
				<button class="btnClose" @click="close">
					<i class="fa-solid fa-circle-xmark"></i>
				</button>
			</div>
			<slot></slot>
		</div>
	</div>
</template>
<style lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.5);
	@include zflex;
	overflow: auto;
	.bg {
		max-width: $lS;
		width: 100%;
		background-color: #fff;
		padding: 16px;
		border-radius: 8px;
		margin: 16px;
		.pop-head {
			@include zflex;
			justify-content: flex-end;
			.btnClose {
				border: none;
				background: none;
				cursor: pointer;
				@include zflex;
				i {
					font-size: 1.5rem;
					color: $graclr;
					background-color: $webD;
					border: none;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
