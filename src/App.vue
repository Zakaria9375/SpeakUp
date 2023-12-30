<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppLoading from '@/components/utils/AppLoading.vue';
// import BreadCrumbs from './components/utils/BreadCrumbs.vue'
const isLoading = ref(false)
const router = useRouter()
router.beforeEach((to, from, next) => {
	isLoading.value = true;
	next()
})
router.afterEach(() => {
	isLoading.value = false
})
</script>

<template>
	<AppHeader />
	<div class="view z-page">
		<!-- <BreadCrumbs /> -->
		<router-view v-if="!isLoading"></router-view>
		<AppLoading v-else/>
	</div>
	<AppFooter />
</template>

<style lang="scss">

</style>
