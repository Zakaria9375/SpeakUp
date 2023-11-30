<script setup>
import LastThread from '@/components/LastThread.vue'
const { forums, title, categoryId } = defineProps({
	forums: {
		type: Array,
		required: true,
	},
	title: {
		type: String, 
		default: 'Forums'
	}
	,
	categoryId: {
		type: String, 
		required: false
	}
})
</script>

<template>
	<div class="col-full">
		<div class="category-item">
			<div class="forum-list" >
				<h2 class="list-title">
					<router-link :to="{ name: 'category', params: { id:  categoryId} }">
						{{ title }}
					</router-link>
				</h2>

				<div 
				class="forum-listing" 
				v-for="forum in forums"
				:key="forum.id"
				>
					<div class="forum-details">
						<router-link :to="{name: 'forum', params: {id: forum.id}}" class="forum-name">
							{{ forum.name }}
						</router-link>
						<p class="forum-description">{{ forum.description }}</p>
					</div>

					<div class="threads-count">
						<p class="count text-lead">{{ forum.threads?.length }}</p>
						{{ forum.threads?.length ? forum.threads?.length > 1 ? 'threads' : 'thread' : 'no-threads'}}
					</div>
					<LastThread :id="forum.id" />
					
				</div>
			</div>
		</div>
	</div>
</template>
