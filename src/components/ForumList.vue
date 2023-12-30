<script setup>
import LastThread from '@/components/threads/LastThread.vue'
const { forums, title, categoryId } = defineProps({
	forums: {
		type: Array,
		required: true,
	},
	title: {
		type: String,
		default: 'Forums',
	},
	categoryId: {
		type: String,
		required: false,
	},
})
</script>

<template>
	<div class="category-item">
		<div class="forum-list">
			<h2 class="list-title">
				<router-link :to="{ name: 'category', params: { id: categoryId } }">
					{{ title }}
				</router-link>
			</h2>

			<div class="forum g-listing" v-for="forum in forums" :key="forum.id">
				<div class="forum-details g-details">
					<router-link :to="{ name: 'forum', params: { id: forum.$id } }" class="forum-name">
						{{ forum.name }}
					</router-link>
					<p class="">{{ forum.description }}</p>
				</div>

				<div class="threads-count noneLS">
					<p class="count">{{ forum.threads?.length }}</p>
					{{
						forum.threads?.length
							? forum.threads?.length > 1
								? 'threads'
								: 'thread'
							: 'no-threads'
					}}
				</div>
				<LastThread v-if="forum.threads" class="noneMedS" :id="forum.$id" />
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.category-item {
	.forum-list {
		.forum {			
			.forum-details {
				flex-shrink: 1;
			}
			.threads-count {
				width: 65px;
				text-align: center;
				.count {
					@include zfont(1.25rem, 300, $dark);
					margin: 0;
					padding-bottom: 8px;
				}
				
			}
			
		}
	}
}
</style>
