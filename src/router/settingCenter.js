export default {
  name: 'settingCenter',
  path: 'settingCenter',
  component: () => import('/@/views/settingCenter/index.vue'),
  meta: { title: '配置中心' },
  redirect: '/main/settingCenter/routeConfig',
  children: [
    {
      path: 'routeConfig',
      name: 'routeConfig',
      meta: { title: '菜单配置', keepAlive: true },
      component: () => import('/@/views/settingCenter/routeConfig/index.vue')
    },
    {
      path: 'roleConfig',
      name: 'roleConfig',
      meta: { title: '角色配置', keepAlive: true },
      component: () => import('/@/views/settingCenter/roleConfig/index.vue')
    }
  ]
}
