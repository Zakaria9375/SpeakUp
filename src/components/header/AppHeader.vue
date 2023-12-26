<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import SignedUser from '@/components/header/SignedUser.vue'

const authStore = useAuthStore()

</script>

<template>
	<div>
		<header>
			<nav class="container">
				<RouterLink to="/" class="logo-wrap" >
					<div class="logo">
						<img src="/src/assets/svg/logo.svg" alt="website logo" />
						<span>Speak up</span>
					</div>
				</RouterLink>
				<SignedUser v-if="authStore.loggedIn" />
				<div v-else class="sign">
					<router-link :to="{ name: 'login' }" class="sign-in">Sign in</router-link>
					<router-link :to="{ name: 'register' }" class="sign-up">Sign up</router-link>
				</div>
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
	}
}
</style>
