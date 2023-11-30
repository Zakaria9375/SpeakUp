<script setup>
import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();
const user = userStore.authUser;
</script>

<template>
	<div>
		<header class="header" id="header">
			<RouterLink to="/" class="logo">
				<div><img src="../assets/svg/logo.svg" alt=""></div>
			</RouterLink>

			<div class="btn-hamburger">
				<!-- use .btn-humburger-active to open the menu -->
				<div class="top bar"></div>
				<div class="middle bar"></div>
				<div class="bottom bar"></div>
			</div>

			<!-- use .navbar-open to open nav -->
			<nav class="navbar">
				<ul>
					<li class="navbar-user">
						<RouterLink :to="{name: 'profile', params: {id: user.id}}">
							<img
								class="avatar-small"
								:src="user.avatar"
								:alt="`${user.name} profile picture`"
							/>
							<span>
								{{ user.name }}
								<img class="icon-profile" src="../assets/svg/arrow-profile.svg" alt="" />
							</span>
						</RouterLink>

						<!-- dropdown menu -->
						<!-- add class "active-drop" to show the dropdown -->
						<div id="user-dropdown">
							<div class="triangle-drop"></div>
							<ul class="dropdown-menu">
								<li class="dropdown-menu-item"><RouterLink to="profile.html">View profile</RouterLink></li>
								<li class="dropdown-menu-item"><RouterLink to="#">Log out</RouterLink></li>
							</ul>
						</div>
					</li>
				</ul>

				<!-- <ul>
					<li class="navbar-item">
						<RouterLink :to="{name: 'home'}">Home</RouterLink>
					</li>
					<li class="navbar-item">
						<RouterLink :to="{name: 'category'}">Category</RouterLink>
					</li>
					<li class="navbar-item">
						<RouterLink :to="{name: 'forum'}">Forum</RouterLink>
					</li>
					<li class="navbar-item">
						<RouterLink :to="{name: 'thread'}">Thread</RouterLink>
					</li>

					<li class="navbar-item mobile-only">
						<RouterLink :to="{name: ''}">My Profile</RouterLink>
					</li>
					<li class="navbar-item mobile-only">
						<RouterLink to="#">Logout</RouterLink>
					</li>
				</ul> -->
			</nav>
		</header>
	</div>
</template>
