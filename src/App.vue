<script setup>
import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppLoading from '@/components/utils/AppLoading.vue'
// import BreadCrumbs from './components/utils/BreadCrumbs.vue'
import {useToggle} from '@/composables/toggle.js'

const { refValue: isReady } = useToggle()
</script>

<template>
	<AppHeader />
	<div class="view z-page">
		<!-- <BreadCrumbs /> -->
		<router-view></router-view>
		<AppLoading v-show="isReady"/>
	</div>
	<AppFooter />
</template>

<style lang="scss"></style>
