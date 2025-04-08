import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import ServicesView from '../views/ServicesView.vue'
import ClientsView from '../views/ClientsView.vue'
import Entry from '../views/Entry.vue'
import SignedinLayout from '@/layouts/SignedinLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Entry,
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/',
      component: SignedinLayout,
      children: [
        {
          path: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'services',
          component: ServicesView,
        },
        {
          path: 'clients',
          component: ClientsView,
        },
      ],
    },
  ],
})

export default router
