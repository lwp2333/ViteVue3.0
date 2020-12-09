import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './main.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('/@/App.vue'),
      meta: {
        title: '首页'
      },
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            title: '登录页'
          },
          component: () => import('/@/views/login/index.vue')
        },
        constantRoutes,
        {
          path: '404',
          name: 'notFound',
          component: () => import('/@/views/404/index.vue'),
          meta: {
            title: 'notFound'
          }
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
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
