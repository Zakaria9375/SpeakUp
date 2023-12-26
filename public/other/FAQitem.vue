<script setup>
import { ref } from 'vue'

const { faq } = defineProps({
	faq: {
		type: Object,
		required: true,
		default: { question: '', answer: '' },
	},
})
const showAnswer = ref(false)

const toggleAnswer = () => {
	showAnswer.value = !showAnswer.value
}
</script>
<template>
	<div class="faq-item">
		<div class="qes" @click="toggleAnswer">
			<h4>{{ faq.question }}</h4>
			<span
				><i class="fa-solid" :class="showAnswer ? 'fa-chevron-up' : 'fa-chevron-down'"></i
			></span>
		</div>
		<div class="ans" :class="showAnswer ? 'notCollapsed' : 'collapsed'">
			<p v-show="showAnswer">{{ faq.answer }}</p>
		</div>
	</div>
</template>
<style lang="scss">
.faq-item {
	.qes {
		@include zflex(row, nowrap, space-between, flex-start);
		padding: 30px 0;
		cursor: pointer;
		h4 {
			margin: 0;
			@include zfont(1.5rem, 700, $bdclr);
		}
		span {
			@include zflex;
			background-color: #666;
			padding: 8px;
			border-radius: 4px;
			i {
				font-size: 1.5rem;
				color: #fff;
			}
		}
	}
	.ans {
		overflow: hidden;
		transition: all 0.6s ease;
		p {
			@include zfont(1.125rem, 400, #666);
			margin: 0;
			padding-bottom: 30px;
		}
	}
}
.notCollapsed {
	max-height: 1500px; 
	
}
.collapsed {
	max-height: 0;
}
</style>
