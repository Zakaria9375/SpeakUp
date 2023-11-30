import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('@/views/ProfilePage.vue'),
			props: route => ({...route.params, id: route.params.id}),
		},
		{
			path: '/forum/:id',
			name: 'forum',
			component: () => import('@/views/ForumPage.vue'),
			props: route => ({...route.params, id: route.params.id}),
		},
		{
			path: '/forum/:id/newThread',
			name: 'newThread',
			component: () => import('@/views/NewThread.vue'),
			props: route => ({...route.params, id: route.params.id}),
		},
		{
			path: '/thread/:id/edit',
			name: 'editThread',
			component: () => import('@/views/ThreadEditing.vue'),
			props: route => ({...route.params, id: route.params.id}),
		},
		{
			path: '/category/:id',
			name: 'category',
			component: () => import('@/views/CategoryPage.vue'),
			props: route => ({...route.params, id: route.params.id}),
		},
		{
			path: '/thread/:id',
			name: 'thread',
			component: () => import('@/views/ThreadPage.vue'),
			props: route => ({...route.params, id: route.params.id}),
			beforeEnter: (to, from, next) => {
				const exist = threads.find(thread => thread.id === to.params.id)
				if (exist) {
					next()
				} else {
					next(
						{
							name: 'NotFound', 
							params: {pathMatch: to.path.split('/').slice(1)} , 
							query: to.query, 
							hash: to.hash
						})
				}				
			
			}
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/NotFoundPage.vue'),			
		}
	],
})

export default router
