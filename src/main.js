import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './style/index.scss'
// 引入mockjs
import './mock/index'
const app = createApp(App)
app.use(Antd).use(router).use(store).mount('#app')
