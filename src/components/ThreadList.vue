<script setup>
import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();
const { threads } = defineProps({
	threads: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div class="col-full">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>
			<div v-for="thread in threads" :key="thread.id" class="thread">
				<div>
					<p>
						<routerLink :to="{ name: 'thread', params: { id: thread.id } }">
							{{thread.title}}
						</routerLink>
					</p>
					<p class="text-faded text-xsmall">
						By <a href="#">{{ userStore.findById( thread.userId).name }}</a
						>, <AppDate :time-stamp="thread.publishedAt"/>.
					</p>
				</div>

				<div class="activity">
					<p class="replies-count">{{ thread.posts.length }} replies</p>

					<img class="avatar-medium" :src="userStore.findById(thread.userId).avatar" alt="" />

					<div>
						<p class="text-xsmall">
							<a href="#">{{ userStore.findById(thread.userId).name }}</a>
						</p>
						<p class="text-xsmall text-faded">
							<AppDate :time-stamp="thread.publishedAt"/>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
