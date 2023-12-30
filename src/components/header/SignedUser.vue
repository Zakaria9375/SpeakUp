<script setup>
import { computed } from 'vue'
import { useToggle } from '@/composables/toggle'
import { useAuthStore } from '@/stores/AuthStore'
import { useAccDbStore } from '@/stores/AccDbStore'
import { vOnClickOutside } from '@vueuse/components'
const authStore = useAuthStore()
const accDbStore = useAccDbStore()
const { refValue: userDD, toggle: toggleUserDD, close: closeUserDD } = useToggle()
const { refValue: nots, toggle: toggleN, close: closeN } = useToggle()
accDbStore.getAccUser()
const user = computed(() => {
	return accDbStore.dbUser
})
</script>

<template>
	<div class="dd-content">
		<div v-if="user.fullName" class="noti" v-on-click-outside="closeN">
			<div class="noticon" @click="toggleN">
				<i class="fa-solid fa-bell"></i>
			</div>
			<div class="list" :class="{ activeNoti: nots }">
				<h2>Notifications</h2>
				<ul>
					<li></li>
				</ul>
			</div>
		</div>
		<div v-if="user.fullName" class="userInfo" v-on-click-outside="closeUserDD">
			<div class="user" @click="toggleUserDD">
				<img class="avatar" :src="user.avatar" :alt="`${user.fullName} profile picture`" />
			</div>
			<ul :class="{ active: userDD }">
				<div class="signedUser">
					<img class="avatar" :src="user.avatar" :alt="`${user.fullName} profile picture`" />
					<span>{{ user.fullName }}</span>
				</div>
				<li>
					<RouterLink :to="{ name: 'profile', params: {id: user.$id} }">
						<div class="icon"><i class="fa-solid fa-user"></i></div>
						profile</RouterLink
					>
				</li>
				<li>
					<RouterLink :to="{ name: 'account' }">
						<div class="icon"><i class="fa-solid fa-gear"></i></div>
						account</RouterLink
					>
				</li>
				<li>
					<RouterLink :to="{ name: 'contact' }">
						<div class="icon"><i class="fa-brands fa-facebook-messenger"></i></div>
						help & support</RouterLink
					>
				</li>
				<li>
					<button type="button" @click="authStore.logout(user.$id)">
						<div class="icon"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
						log out
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="scss">
.dd-content {
	@include zflex;
	gap: 10px;
}
.userInfo {
	height: 80px;
	position: relative;

	.user {
		height: 100%;
		cursor: pointer;
		@include zflex;
	}
	ul {
		position: absolute;
		background-color: #fff;
		border-radius: 8px;
		padding: 8px;
		min-width: 250px;
		right: 0;
		z-index: 5;
		display: none;
		box-shadow:
			rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
			rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
		&.active {
			display: block;
		}
		.signedUser {
			height: 100%;
			padding-bottom: 8px;
			@include zflex;
			border-bottom: 0.5px solid $divider;
			span {
				@include zfont(1.125rem, 500, $dark);
			}
		}
		li {
			padding: 16px;
			@include zflex;
			a,
			button {
				@include zflex;
				justify-content: flex-start;
				width: 100%;
				cursor: pointer;
				border: none;
				background: none;
				@include zfont(1.125rem, 600, $dark);
				text-transform: capitalize;
				padding: 0 8px;
				gap: 10px;
				.icon {
					width: fit-content;
					padding: 8px;
					margin: 0 5px;
					background-color: #dcdcdc;
					border-radius: 50%;
					@include zflex;
					i {
						font-size: 1.25rem;
					}
				}
			}
		}
	}
}
.noti {
	position: relative;

	.noticon {
		cursor: pointer;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #eeeeee;
		@include zflex;
		i {
			font-size: 1.75rem;
		}
	}
	.list {
		position: absolute;
		background-color: #fff;
		border-radius: 8px;
		padding: 8px;
		min-width: 250px;
		right: -30px;
		top: 65px;
		z-index: 5;
		display: none;
		box-shadow:
			rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
			rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
		&.activeNoti {
			display: block;
		}
		h2 {
			margin: 12px;
			@include zfont(1.5rem, 700, $dark);
		}
	}
}
</style>
