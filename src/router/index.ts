import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layout/index.vue'),
      meta: {
        title: '首页',
        icon: 'House',
      },
      children: [
        {
          path: '/home1',
          name: 'home1',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: '首页1',
            icon: 'CirclePlus',
          },
        },
        {
          path: '/home2',
          name: 'home2',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: '首页2',
            icon: 'Female',
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../layout/index.vue'),
      meta: {
        title: '关于',
        icon: 'info',
      },
      children: [
        {
          path: '/about',
          name: 'about1',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: '关于1',
            icon: 'Setting',
          },
        },
      ],
    },
  ],
})

export default router
