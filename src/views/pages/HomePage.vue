<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import {onMounted} from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import ForumList from '@/components/ForumList.vue'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const CategoryStore = useCategoryStore()
const router = useRouter()
CategoryStore.getCategories()
onMounted(() => {
	if(!authStore.loggedIn) {
		router.push({name: 'welcome'})
	}
})
</script>

<template>
	<div>
		<div v-if="authStore.loggedIn" class="main-page z-page z-clr p-32">
			<div class="container">
				<div v-for="category in CategoryStore.categories" :key="category.$id">
					<ForumList
						v-if="category.forums"
						:forums="category.forums"
						:title="category.name"
						:categoryId="category.$id"
					></ForumList>
				</div>
			</div>
		</div>
	</div>
</template>
