import dashBoard from './dashBoard'
import userCenter from './userCenter'
import settingCenter from './settingCenter'
export default {
  path: 'main',
  name: 'main',
  component: () => import('/@/layouts/index.vue'),
  redirect: '/main/dashBoard',
  children: [dashBoard, userCenter, settingCenter]
}
