export default {
  name: 'userCenter',
  path: 'userCenter',
  component: () => import('/@/views/userCenter/index.vue'),
  meta: { title: '示例中心' },
  redirect: '/main/userCenter/amap',
  children: [
    {
      path: 'form',
      name: 'form',
      meta: { title: '表单', keepAlive: true },
      component: () => import('/@/views/userCenter/form/index.vue')
    },
    {
      path: 'amap',
      name: 'amap',
      meta: { title: '地图', keepAlive: true },
      component: () => import('/@/views/userCenter/amap/index.vue')
    },
    {
      path: 'table',
      name: 'table',
      meta: { title: '表格', keepAlive: true },
      component: () => import('/@/views/userCenter/table/index.vue')
    },
    {
      path: 'hooks',
      name: 'hooks',
      meta: { title: 'Hooks', keepAlive: true },
      component: () => import('/@/views/userCenter/hooks/index.vue')
    },
    {
      path: 'component',
      name: 'component',
      meta: { title: '组件', keepAlive: true },
      component: () => import('/@/views/userCenter/component/index.vue')
    },
    {
      path: 'tagView',
      name: 'tagView',
      meta: { title: '视图切换', keepAlive: true },
      component: () => import('/@/views/userCenter/tagView/index.vue')
    }
  ]
}
