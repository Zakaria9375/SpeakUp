<!-- Breadcrumbs.vue
<script setup>
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadcrumbs = reactive([])
const hasValue = (value) => {
	return breadcrumbs.some((breadcrumb) => breadcrumb.text === value)
}
watchEffect(() => {
	const matchedRoutes = route.matched

	// Check if the value already exists before pushing a new item
	const newValue = matchedRoutes.map((route) => route.meta && route.meta.breadcrumb).join(' > ')
	const idx = breadcrumbs.findIndex((breadcrumb) => breadcrumb.text === newValue)

	if (!hasValue(newValue)) {
		breadcrumbs.push({ text: newValue, to: route.path })
	} else {
		breadcrumbs.splice(idx + 1)
	}
})
</script>
<template>
	<div class="breadcrumbs">
		<div v-for="(breadcrumb, index) in breadcrumbs" class="bc-item">
			<router-link :to="breadcrumb.to" :key="index">
				{{ breadcrumb.text }}
			</router-link>
		</div>
	</div>
</template>

<style lang="scss">
.breadcrumbs {
	font-size: 14px;
	padding: 16px;
	@include zflex;
	justify-content: flex-start;
	.bc-item {
		
		position: relative;
		a {
			text-decoration: none;
			color: #007bff;
			margin-right: 5px;
			&:hover {
				text-decoration: underline;
			}
		}
		&:not(:last-of-type):after {
			content: "▶";
			position: absolute;
			left: 0;
		}
	}
}
</style> -->
