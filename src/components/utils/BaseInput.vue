<script setup>
const { title, modelValue, nom } = defineProps({
	title: { type: String, default: '' },
	modelValue: { type: [String, Number, Date], default: '' },
	nom: { type: String, required: false },
	errorMessage: { type: String, required: false },
	isTextarea: { type: Boolean, required: false, default: false },
})
</script>

<template>
	<div v-if="!isTextarea" class="input-wrapper">
		<label :for="nom">{{ title }}</label>
		<input
			v-bind="$attrs"
			:name="nom"
			:id="nom"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:class="{ error: errorMessage }"
		/>
		<div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
	</div>
	<div v-if="isTextarea" class="input-wrapper">
		<label :for="nom">{{ title }}</label>
		<textarea
			v-bind="$attrs"
			:name="nom"
			:id="nom"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:class="{ error: errorMessage }"
		></textarea>
		<div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
	</div>
</template>

<style lang="scss">
.input-wrapper {
	margin-bottom: 20px;
	width: 100%;
	label {
		display: block;
		margin-bottom: 8px;
		color: $graclr;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		&.error {
			border-color: $errclr;
		}
	}
	textarea {
		resize: none;
		width: 100%;
		border: 1px solid #ccc;
		overflow-y: auto;
		min-height: 140px;
	}
}

.error-message {
	color: $errclr;
	margin: 10px;
	text-align: start;
}
</style>
