<script setup>
import { useUserStore } from '@/stores/UserStore'
const authId = useUserStore().authId
const { posts } = defineProps({ posts: { type: Array, required: true } })
</script>
<template>
	<div>
		<div class="p-list">
			<div class="post" v-for="post in posts" :key="post.$id">
				<div class="u-detail">
					<div class="u-info">
						<router-link :to="{name: 'profile', params: {id: post.madeBy.$id}}" class="user">
							<img class="xxavatar" :src="post.madeBy.avatar" alt="post.madeBy.username" />
							<div class="user-n">{{ post.madeBy.fullName }}</div>
						</router-link>
					</div>

					<p class="p-content">{{ post.content }}</p>
				</div>
				<button v-if="authId === post.madeBy.$id" class="editA nobtn" @click="open" title="Make a change"
					><i class="fa fa-pencil"></i
				></button>
				<div class="date">
					<BaseDate :isoTimestamp="post.$createdAt" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.p-list {
	.post {
		background-color: #fff;
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;		margin-bottom: 25px;
		border-radius: 8px;
		overflow: hidden;
		position: relative;
		@include more($mS) {
			.u-detail {
				display: grid;
				grid-template-columns: minmax(175px, 200px) auto;
				.u-info {
					min-height: 165px;
					@include zflex(column, wrap, center, center);
					text-align: center;
					background-color: #efefef;
					.xxavatar {
						border-radius: 50%;
						max-width: 100%;
						width: 120px;
						height: 120px;
					}
				}
				.p-content {
					flex: 1;
					padding: 16px 40px 40px 16px;
					@include zfont(1.125rem, 400, $dark);
					margin: 0;
					line-height: 1.4;
					text-align: justify;
				}
			}
			.editA {
				position: absolute;
				right: 0;
				top: 0;
				padding: 10px;
				i {
					color: $bluclr;
				}
			}
			.date {
				position: absolute;
				right: 0;
				bottom: 0;
				padding: 10px;
			}
		}
		@include less($mS) {
			.u-detail {
				.u-info {
					background-color: #ced4da;
					.user {
						@include zflex(row, nowrap, flex-start, center);
						padding: 6px;
						.xxavatar {
							border-radius: 50%;
							max-width: 100%;
							width: 45px;
							height: 45px;
						}
						.user-n {
							@include zfont(1.125rem, 400, $dark);
						}
					}
				}
				.p-content {
					padding: 16px 16px 40px;
					@include zfont(1.125rem, 400, $dark);
					margin: 0;
					line-height: 1.4;
					text-align: justify;
				}
			}
			.editA {
				position: absolute;
				right: 5px;
				top: 10px;
				padding: 10px;
			}
			.date {
				position: absolute;
				right: 0;
				bottom: 0;
				padding: 10px;
			}
		}
	}
}
</style>
