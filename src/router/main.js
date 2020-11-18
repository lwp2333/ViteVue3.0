import userCenter from './userCenter'
import dashBoard from './dashBoard'
export default {
  path: 'main',
  name: 'main',
  component: () => import('/@/layouts/index.vue'),
  redirect: '/main/dashBoard',
  children: [dashBoard, userCenter]
}
