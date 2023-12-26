<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { useDataStore } from '@/stores/DataStore'
import CategoryList from '@/views/lists/CategoryList.vue'
import WelcomePage from '@/views/pages/WelcomePage.vue'
const authStore = useAuthStore()
const dataStore = useDataStore()
dataStore.getCategories()
</script>

<template>
	<CategoryList v-if="authStore.loggedIn" :categories="dataStore.categories" />
	<WelcomePage v-else/>
</template>
