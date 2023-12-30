<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import SignedUser from '@/components/header/SignedUser.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const authStore = useAuthStore()
const isWelcomePage = computed(() => {
	return route.path === '/' && authStore.loggedIn
})
const logoLink = computed(() => {
	return authStore.loggedIn ? '/home' : '/'
})
</script>

<template>
	<div>
		<header>
			<nav class="container">
				<RouterLink :to="logoLink" class="logo-wrap">
					<div class="logo">
						<img src="/static/svg/logo.svg" alt="website logo" />
						<span>Speak up</span>
					</div>
				</RouterLink>
				<section class="reg-tools">
					<SignedUser v-if="authStore.loggedIn" />
					<div v-else class="sign">
						<router-link :to="{ name: 'login' }" class="sign-in">Sign in</router-link>
						<router-link :to="{ name: 'register' }" class="sign-up">Sign up</router-link>
					</div>
					<router-link v-if="isWelcomePage" :to="{ name: 'home' }" class="or-btn"
						>Go to Dashboard</router-link
					>
				</section>
			</nav>
		</header>
	</div>
</template>
<style lang="scss">
header {
	height: 80px;
	background-color: #fff;
	// border-bottom: 1px solid $divider;
	nav {
		@include zflex(row, nowrap, space-between, center);
		.logo {
			padding: 16px;
			@include zflex(row, nowrap, center, flex-end);
			img {
				display: inline-block;
				width: 48px;
				height: 48px;
			}
			span {
				margin-left: 0.25rem;
				@include zfont(1.75rem, 400, #1f2937);
				font-family: 'Great Vibes', cursive;
				@include less($smS) {
					display: none;
				}
			}
			&:hover {
				img {
					transform: rotate(15deg);
					transition: all 0.3s ease;
				}
				span {
					color: $bluclr;
				}
			}
		}
		.reg-tools {
			@include zflex;
		}
		.sign {
			@include zflex;
			.sign-in {
				@include zfont(1.25rem, 500, #0f172a);
				padding: 16px 10px;
				&:hover {
					color: $bluclr;
				}
			}
			.sign-up {
				margin-left: 8px;
				@include zbtn(#0284c7, 12px 24px);
				@include zfont(1.125rem, 500, #fff);
			}
		}
		.or-btn {
			@include zbtn(#f6c25f, 12px 24px);
			@include zfont(1rem, 500, $gra2clr);
			cursor: pointer;
			margin-left: 12px;
		}
	}
}
</style>
