export default {
  name: 'userCenter',
  path: '/layouts/userCenter',
  component: () => import('/@/views/userCenter/index.vue'),
  meta: { title: '用户中心' },
  redirect: '/layouts/userCenter/amap',
  children: [
    {
      path: 'form',
      name: 'form',
      meta: { title: '表单' },
      component: () => import('/@/views/userCenter/form/index.vue')
    },
    {
      path: 'amap',
      name: 'amap',
      meta: { title: '地图' },
      component: () => import('/@/views/userCenter/amap/index.vue')
    },
    {
      path: 'table',
      name: 'table',
      meta: { title: '表格' },
      component: () => import('/@/views/userCenter/table/index.vue')
    },
    {
      path: 'hooks',
      name: 'hooks',
      meta: { title: 'Hooks' },
      component: () => import('/@/views/userCenter/hooks/index.vue')
    }
  ]
}
