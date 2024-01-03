import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/views/static/WelcomePage.vue'
import HomePage from '@/views/pages/HomePage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'welcome',
			component: WelcomePage,
		},
		{
			path: '/home',
			name: 'home',
			component: HomePage,
			meta: { breadcrumb: 'Home', requiresAuth: true },
		},
		{
			path: '/contact-us',
			name: 'contact',
			component: () => import('@/views/static/ContactPage.vue'),
		},

		//Auth pages 6
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
			path: '/account',
			name: 'account',
			component: () => import('@/views/auth/AccountPage.vue'),
		},
		{
			path: '/verify-email',
			name: 'verifyEmail',
			component: () => import('@/views/auth/EmailVerify.vue'),
		},
		{
			path: '/password-reset',
			name: 'passwordReset',
			component: () => import('@/views/auth/PasswordRecovery.vue'),
		},
		{
			path: '/google-login-success',
			name: 'google-success',
			component: () => import('@/components/sign/GoogleSuccess.vue'),
		},
		//main pages 4
		{
			path: '/category/:id',
			name: 'category',
			component: () => import('@/views/pages/CategoryPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Category', requiresAuth: true },
		},
		{
			path: '/forum/:id',
			name: 'forum',
			component: () => import('@/views/pages/ForumPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Forum', requiresAuth: true },
		},
		{
			path: '/thread/:id',
			name: 'thread',
			component: () => import('@/views/pages/ThreadPage.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Thread', requiresAuth: true },
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('@/views/pages/ProfileView.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
		},
		//helpers pages 2
		{
			path: '/forum/:id/new-thread',
			name: 'newThread',
			component: () => import('@/views/pages/ThreadCreate.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'New Thread', requiresAuth: true },
		},
		{
			path: '/thread/:id/edit',
			name: 'editThread',
			component: () => import('@/views/pages/ThreadUpdate.vue'),
			props: (route) => ({ ...route.params, id: route.params.id }),
			meta: { breadcrumb: 'Edit Thread', requiresAuth: true },
		},
		//not found page 1
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/static/NotFoundPage.vue'),
		},
	],
})
export default router



