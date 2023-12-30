<script setup>
const { user } = defineProps({
	user: { required: true, type: Object },
	
})
</script>

<template>
	<div v-if="user.fullName" class="profile-card">
		<div class="main">
			<div class="photo">
				<div class="user-avatar">
					<img :src="user.avatar" :alt="user.username" class="avatar-xlarge" />
				</div>
			</div>
			<div class="info">
				<h1 class="name">{{ user.fullName }}</h1>
				<h2 class="username">{{ user.username }}</h2>
			</div>
		</div>
		<div class="about">
			<h2>About</h2>
			<div class="bioP">
				<p class="bio">{{ user.bio ? user.bio : `No bio specified.` }}</p>
			</div>

			<div class="stats">
				<span
					>{{ user.posts?.length > 0 ? user.posts?.length : 'no' }} post{{
						user.posts.length > 1 ? 's' : ''
					}}</span
				>
				<span
					>{{ user.threads?.length > 0 ? user.threads?.length : 'no' }} thread{{
						user.posts.length > 1 ? 's' : ''
					}}</span
				>
			</div>
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
				<p v-if="user.isActive" class="active-user">Status: <span>Online</span></p>
				<p v-else>
					<span class="lead">Last visit at:</span>
					<BaseDate v-if="user.lastVisitAt" :isoTimestamp="user.lastVisitAt" />
				</p>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
.profile-card {
	width: 100%;
	@include less($lS) {
		@include zflex(row, wrap, space-evenly, flex-end);
	}
	.main {
		.photo {
			@include zflex;
			.user-avatar {
				border-radius: 50%;
				.avatar-xlarge {
					width: 200px;
					height: 200px;
					max-width: 100%;
				}
			}
		}
		.info {
			.name {
				@include zfont(2.25rem, 700, $dark);
				text-align: center;
				margin: 0 0 10px;
			}
			.username {
				@include zfont(1.5rem, 400, $graclr);
				text-align: center;
				margin: 0 0 16px;
			}
		}
	}
	.about {
		padding: 4px 12px 0;
		margin-bottom: 16px;
		.bioP {
			max-width: 270px;
			.bio {
				@include zfont(1.25rem, 500, $dark);
			}
		}
		.stats {
			@include zflex;
			margin: 20px 0;
			text-align: center;
			span {
				@include zfont(1.25rem, 400, $dark);
				flex-basis: 50%;
			}
		}
		.member {
			align-self: self-start;

			p {
				margin: 0 0 10px;
			}
			.active-user {
				@include zfont(1.125rem, 400, $dark);
				span {
					color: $greclr;
				}
			}
			span.lead {
				margin-right: 12px;
				@include zfont(1.15rem, 400, $dark);
			}
		}
	}
}
</style>
