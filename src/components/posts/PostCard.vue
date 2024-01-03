<script setup>
import { useAccDbStore } from '@/stores/AccDbStore'
import { useToggle } from '@/composables/toggle.js'
import PostUpdate from '@/components/posts/PostUpdate.vue'
import PostDelete from '@/components/posts/PostDelete.vue'

const authId = useAccDbStore().authId
const { post } = defineProps({
	post: { type: Object, required: true },
	onlineDisplay: { required: false, type: Boolean, default: true },
})
const { refValue: edit, open: openEdit, close: closeEdit } = useToggle()
const { refValue: deleting, open: openDelete, close: closeDelete } = useToggle()
</script>
<template>
	<div class="post">
		<div class="post-detail">
			<div class="u-info">
				<router-link :to="{ name: 'profile', params: { id: post.madeBy?.$id } }" class="user">
					<img class="xxavatar" :src="post.madeBy?.avatar" alt="post.madeBy.username" />
					<div class="user-n">
						<span v-if="post.madeBy?.isActive && onlineDisplay" class="online"
							><img class="online" src="/static/online.png" alt="online" /></span
						>{{ post.madeBy?.fullName }}
					</div>
				</router-link>
			</div>
			<p class="p-content">{{ post.content }}</p>
		</div>
		<div v-if="authId === post.madeBy?.$id" class="edit-btns">
			<button class="editA nobtn" @click="openEdit" title="Make a change">
				<i class="fa fa-pencil"></i>
			</button>
			<button class="editA nobtn" @click="openDelete" title="Delete post">
				<i class="fa-solid fa-trash-can"></i>
			</button>
		</div>

		<div class="date">
			<BaseDate :isoTimestamp="post.$createdAt" />
		</div>
	</div>
	<PopUp v-if="edit" @close="closeEdit">
		<PostUpdate v-if="post" :post="post" @post-updated="closeEdit" />
	</PopUp>

	<PopUp class="del-main" v-if="deleting" @close="closeDelete">
		<PostDelete v-if="post" :id="post.$id" @post-deleted="closeDelete" @cancel="closeDelete" />
	</PopUp>
</template>
<style lang="scss">
.post {
	background-color: #fff;
	box-shadow:
		rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
		rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	margin-bottom: 25px;
	border-radius: 8px;
	overflow: hidden;
	position: relative;
	@include more($mS) {
		.post-detail {
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
				position: relative;
				flex: 1;
				padding: 16px 40px 40px 16px;
				@include zfont(1.125rem, 400, $dark);
				margin: 0;
				line-height: 1.4;
				text-align: justify;
			}
		}
		.edit-btns {
			@include zflex;
			flex-direction: column;
			position: absolute;
			right: 0;
			top: 35px;
			background-color: $web;
			border-top-left-radius: 6px;
			border-bottom-left-radius: 6px;

			border: 0.5px solid $web;
			padding: 10px;
			.editA:first-child {
				margin-bottom: 15px;
			}
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
		.post-detail {
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
		.edit-btns {
			@include zflex;

			gap: 10px;
			position: absolute;
			right: 5px;
			top: 10px;
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
}

.firstPostStyle {
	border: 1px solid #000;
}
</style>
