export default [
  {
    path: '/',
    name: '/',
    component: () => import('/@/App.vue'),
    redirect: '/echarts',
    children: [
      {
        path: 'echarts',
        name: 'echarts',
        component: () => import('/@/views/echarts/index.vue')
      }
    ]
  },
  {
    path: '/layouts',
    name: 'layouts',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/layouts/form',
    children: [
      {
        path: 'form',
        name: 'form',
        component: () => import('/@/views/form/index.vue')
      },
      {
        path: 'amap',
        name: 'amap',
        component: () => import('/@/views/amap/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('/@/views/table/index.vue')
      },
      {
        path: 'hooks',
        name: 'hooks',
        component: () => import('/@/views/hooks/index.vue')
      }
    ]
  }
]
