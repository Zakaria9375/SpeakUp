<script setup>
import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
// import BreadCrumbs from './components/utils/BreadCrumbs.vue'
</script>

<template>
	<AppHeader />
	<div class="view">
		<!-- <BreadCrumbs /> -->
		<router-view></router-view>
	</div>
	<AppFooter />
</template>

<style lang="scss">
.view {
}
</style>
