import userCenter from './userCenter'
import dashBoard from './dashBoard'
export default {
  path: '/layouts',
  name: 'layouts',
  component: () => import('/@/layouts/index.vue'),
  redirect: '/layouts/dashBoard',
  children: [dashBoard, userCenter]
}
