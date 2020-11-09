import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../App.vue'),
      redirect: '/echarts',
      children: [
        {
          path: 'echarts',
          name: 'echarts',
          component: () => import('../views/echarts/index.vue')
        }
      ]
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: () => import('../layouts/index.vue'),
      redirect: '/layouts/form',
      children: [
        {
          path: 'form',
          name: 'form',
          component: () => import('../views/form/index.vue')
        }
      ]
    }
  ]
})

export default router
