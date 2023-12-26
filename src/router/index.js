import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/pages/HomePage.vue'
import { useUserStore } from '@/stores/UserStore'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
			meta: { breadcrumb: 'Home' },
		},
		{
			path: '/contact-us',
			name: 'contact',
			component: () => import('@/views/pages/ContactPage.vue'),
		},

		//Auth pages 4
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/auth/LoginPage.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/auth/SignupPage.vue'),
		},
		{
			path: '/forget-password',
			name: 'forgetPass',
			component: () => import('@/views/auth/ForgetPassword.vue'),
		},
		{
			path: '/myprofile',
			name: 'myprofile',
			component: () => import('@/views/auth/ProfilePage.vue'),
		},
		{
			path: '/account',
			name: 'account',
			component: () => import('@/views/auth/AccountPage.vue'),
		},
		//main pages 4
		{
			path: '/category/:id',
			name: 'category',
			component: () => import('@/views/pages/CategoryPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Category' },
		},
		{
			path: '/forum/:id',
			name: 'forum',
			component: () => import('@/views/pages/ForumPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Forum' },
		},
		{
			path: '/thread/:id',
			name: 'thread',
			component: () => import('@/views/pages/ThreadPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Thread' },
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('@/views/pages/ProfileView.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			beforeEnter: (to, from, next) => {
				const id = to.params.id
				const store = useUserStore()
				const authId = store.authId
				if (id === authId) {
					// Redirect to another route
					console.log('redirecting to myprofile')
					next({ name: 'myprofile' })
				} else {
					// Proceed with the original route
					next()
				}
			},
		},
		//helpers pages 2
		{
			path: '/forum/:id/new-thread',
			name: 'newThread',
			component: () => import('@/views/pages/ThreadCreate.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
		},
		{
			path: '/thread/:id/edit',
			name: 'editThread',
			component: () => import('@/views/pages/ThreadUpdate.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
		},
		//not found page 1
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/pages/NotFoundPage.vue'),
		},
	],
})
export default router
