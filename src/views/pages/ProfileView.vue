<script setup>

import ProfileCard from '@/views/auth/ProfileCard.vue'
import PostList from '@/views/lists/PostList.vue'
import { useDataStore } from '@/stores/DataStore.js'
const { id } = defineProps({
	id: {type: String, required: true}
})
const { state: user, isReady } = useDataStore().getDoc('users', id)
</script>

<template>
	<div v-if="isReady">
		<div class="profile-page">
			<div class="main-profile cardW">
				<ProfileCard :user="user" />
				<div class="member">
					<p>
						<span class="lead">Member since:</span>
						<BaseDate
							v-if="user.registeredAt"
							:act="true"
							:isoTimestamp="user.registeredAt"
							forma="ll"
						/>
					</p>
					<p>
						<span class="lead">Last visit at:</span>
						<BaseDate v-if="user.lastVisitAt" :isoTimestamp="user.lastVisitAt" />
					</p>
				</div>
			</div>

			<div class="main-activity cardW">
				<div class="profile-header">
					<h4>your's recent activity</h4>
					<p>See only <span>threads</span> <span>posts</span> or <span>all</span></p>
				</div>
				<div class="activity-list">
					<!-- <PostList v-if="userdb.posts" :posts="userdb.posts" /> -->
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.profile-page {
	@include zflex;
	margin: 0 auto;
	gap: 3%;
	background-color: $web;
	.main-profile {
		flex: 0 0 30%;
		min-width: 300px;
		@include zflex(column, nowrap, center, center);
		.member {
			align-self: self-start;

			p {
				margin: 0 0 10px;
			}
			span.lead {
				margin-right: 12px;
				@include zfont(1.15rem, 400, $dark);
			}
		}
		.zbtn {
			margin: 16px 0;
		}
	}
	.main-activity {
		flex: 1 1 67%;
		.profile-header {
			@include zflex;
			justify-content: space-between;
			padding: 0 12px 8px;
			h4 {
				@include zfont(1.15rem, 600, $dark);
				text-transform: capitalize;
			}
			p {
				@include zfont(1.075rem, 400, $dark);
				span {
					@include zfont(1.075rem, 600, $dark);
					padding: 8px 12px;
					background-color: $webD;
					border-radius: 8px;
					cursor: pointer;
				}
			}
		}
		.activity-list {
		}
	}
	@include less($mS) {
		flex-direction: column;
		.main-profile {
			width: 90%;
		}
		.main-activity {
			width: 90%;
		}
	}
}
</style>
