<template>
  <a-layout class="layOut">
    <a-layout-header class="header">
      <div class="logo">next-admin</div>
      <div class="right">
        <!-- 其他东西 -->
        <div class="avatar">
          <a-avatar :size="42" :src="logo" />
          <!-- <a-dropdown>
            <a-button type="link">
              <template #icon>
                <MoreOutlined size="32" />
              </template>
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown> -->
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="160" collapsedWidth="0" breakpoint="lg">
        <a-menu
          theme="dark"
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
          @openChange="openChange"
          @click="link"
        >
          <template v-for="(item, index) in menuList" :key="index">
            <a-sub-menu v-if="item.children" :key="item.path">
              <template #title>
                <span><user-outlined />{{ item.meta.title }}</span>
              </template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">{{ subItem.meta.title }}</a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="item.path">{{ item.meta.title }}</a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item v-for="(item, index) in matchRoute" :key="index">
            <router-link v-if="!item.meta.title" :to="item.path"> <home-outlined /> 仪表盘 </router-link>
            <router-link v-else :to="item.path"> {{ item.meta.title }} </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center', padding: '12px' }"> next-admin©2020 Created by lwp2333 </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { reactive, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import menu from '../router/main'
import logo from '/@/assets/img/avatar.jpg'
import main from '../router/main'
export default {
  name: 'Ant',
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    HomeOutlined
  },
  setup() {
    const { children: constantMenu } = menu
    const menuList = reactive(constantMenu)
    const openKeys = reactive([])
    const selectedKeys = reactive([])
    const Router = useRouter()
    const currRoute = useRoute()
    const matchRoute = reactive([])
    watchEffect(() => {
      /**
       * create 根据当前路由url，绑定 选中当前菜单
       */
      const { fullPath: currPath } = currRoute
      const arr = currPath.split('/')
      const routeReverse = [...arr].reverse()
      const path = routeReverse[0]
      const openPath = routeReverse[1]
      openKeys.length = 0
      openKeys.push(openPath)
      selectedKeys.length = 0
      selectedKeys.push(path)
      /**
       * 面包屑导航 逻辑
       */
      const { matched } = currRoute
      /**
       * 过滤掉  app, /main/dashBoard
       */
      const breadcrumb = matched.filter(item => {
        return item.name !== 'dashBoard' && item.name !== 'app'
      })
      matchRoute.length = 0
      matchRoute.push(...breadcrumb)
    })

    const openChange = e => {
      openKeys.length = []
      openKeys.push(...e)
    }
    const link = e => {
      const { key, keyPath } = e
      selectedKeys.length = 0
      selectedKeys.push(key)
      const path = keyPath.reverse().join('/')
      Router.push(`/main/${path}`)
    }
    return {
      menuList,
      selectedKeys,
      openKeys,
      openChange,
      link,
      matchRoute,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~../../../style/mixins.scss';
.layOut {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px !important;
    .logo {
      padding: 12px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8%;
      font-size: 14px;
      line-height: 14px;
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        margin-left: 24px;
      }
    }
  }
}

.breadcrumb {
  padding: 11px 42px;
  background: rgb(240, 242, 245);
}
::v-deep(.ant-layout-sider-zero-width-trigger) {
  top: 0 !important;
  color: #000000;
  background-color: rgba(255, 255, 255, 0);
}
.content {
  width: 100%;
  min-height: calc(100vh - 178px);
  overflow: auto;
  background-color: #ffffff;
  padding: 20px;
  margin: 0;
  @include scrollbar-Y;
}
.ant-menu-inline .ant-menu-item {
  margin-top: 0;
}
</style>
