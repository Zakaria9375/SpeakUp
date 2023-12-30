<script setup>
import { ref } from 'vue'
const emit = defineEmits(['save', 'cancel'])
const props = defineProps({
	title: { type: String, required: false, default: '' },
	content: { type: String, required: false, default: '' },
	btnSubmit: { type: String, required: false, default: 'Submit' },
})
const form = ref({
	title: props.title,
	content: props.content,
})
function save() {
	emit('save',  form.value )
}
function cancel() {
	emit('cancel')
}
</script>

<template>
	<form @submit.prevent="save">
		<BI required v-model="form.title" placeholder="Write your thread title..." nom="title" title="Title" class="nt-input"></BI>
		<BI
			:isTextarea="true"
			required
			placeholder="Write your first post content..."
			class="nt-textarea nt-input"
			title="Content"
			nom="content"
			v-model="form.content"
		></BI>
		<div class="form-actions">
			<button @click="cancel" type="button" class="gh-btn">Cancel</button>
			<button class="blu-btn" type="submit">{{ btnSubmit }}</button>
		</div>
	</form>
</template>
<style lang="scss">
form {
	margin: 0 auto;
	max-width: $lS;
	width: 100%;

	.nt-input {
		border-radius: 12px;
		@include zfont(1.125rem, 400, $dark);
		padding: 16px;
	}
	.nt-textarea{
		min-height: 200px;
	}
	.form-actions {
		@include zflex(row, nowrap, flex-end, center);

		.gh-btn {
			@include zfont(1.125rem, 400, #000);
			margin-right: 12px;
			background: none;
			border: none;
			padding: 15px 36px;
			border-radius: 8px;
			&:hover {
				background-color: #adaaaa;
				color: #fff;
				cursor: pointer;
			}
		}
		.blu-btn {
			@include zbtn(#263959, 15px 36px);
			@include zfont(1.125rem, 400, #fff);
		}
	}
}
</style>
