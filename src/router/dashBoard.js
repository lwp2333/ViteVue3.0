export default {
  name: 'dashBoard',
  path: '/layouts/dashBoard',
  meta: { title: '仪表盘' },
  component: () => import('/@/views/dashBoard/index.vue')
}
