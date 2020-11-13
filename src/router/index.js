import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './layouts'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('/@/App.vue'),
      meta: {
        title: '首页'
      },
      redirect: '/echarts',
      children: [
        {
          path: 'echarts',
          name: 'echarts',
          meta: {
            title: '登录页'
          },
          component: () => import('/@/views/echarts/index.vue')
        }
      ]
    },
    constantRoutes
  ]
})
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
