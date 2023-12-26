<script setup>
const { threads } = defineProps({
	threads: {
		type: Array,
		required: true,
	},
})
console.log(threads)
</script>

<template>
	<div class="thread-item">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>
			<div v-for="thread in threads" :key="thread.$id" class="thread g-listing">
				<div class="g-details flex">
					<routerLink :to="{ name: 'thread', params: { id: thread.$id } }">
						{{ thread.title }}
					</routerLink>
					<p class="replies">{{ thread.posts.length - 1}} replies</p>
				</div>

				<div class="madeBy noneSS">
					<img class="xavatar" :src="thread.madeBy.avatar" alt="thread.madeBy.username" />
					<div class="g-detail">
						<router-link :to="{ name: 'profile', params: { id: thread.madeBy.$id } }">{{ thread.madeBy.fullName }}</router-link>
						<p>
							<BaseDate :isoTimestamp="thread.$createdAt" />
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.thread-item {
	.thread-list {
		.thread {
			.flex {
				flex-grow: 1;
				@include zflex(row, wrap, space-between, center);
				row-gap: 10px;
				.replies {
					@include zfont(1.125rem, 300, $dark);
					margin: 0;
				}
			}
			.madeBy {
				flex-basis: 40%;
				@include more($smS) {
					@include zflex;
					justify-content: flex-end;
				}
			}
		}
	}
}
</style>
