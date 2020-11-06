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
    }
  ]
})

export default router
