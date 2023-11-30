<script setup>
import { computed } from 'vue'
import { useForumStore } from '@/stores/ForumStore';
import ForumList from '@/components/ForumList.vue';
import { useCategoryStore } from '@/stores/CategoryStore'
const forumStore = useForumStore()
const categoryStore = useCategoryStore()
const { id } = defineProps({
	id: { required: true, type: String },
})

</script>

<template>
	<div class="col-full push-top">
		<div class="forum-header">
			<div class="forum-details">
				<h1>{{ categoryStore.findById( id).name }}</h1>
				<p class="text-lead">
					{{ categoryStore.findById(id).description }}
				</p>
			</div>

		</div>
		<div class="col-full">
			<ForumList 
				:forums ="forumStore.filterByCategoryId(id)" 
			/>
		</div>
	</div>
</template>
