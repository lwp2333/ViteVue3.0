<template>
  <a-layout class="layOut">
    <a-layout-header class="header">
      <div class="logo">next-admin</div>
      <div class="right">
        <a-space size="middle">
          <a-tooltip title="刷新页面" arrow-point-at-center>
            <ReloadOutlined @click="refreshView" :style="iconStyle" />
          </a-tooltip>
          <a-tooltip v-if="!isFullscreen" title="进入全屏" arrow-point-at-center>
            <FullscreenOutlined @click="toggleFull" :style="iconStyle" />
          </a-tooltip>
          <a-tooltip v-else title="退出全屏" arrow-point-at-center>
            <FullscreenExitOutlined @click="toggleFull" :style="iconStyle" />
          </a-tooltip>
        </a-space>
        <!-- avatar -->
        <div class="avatar">
          <a-avatar :size="48" :src="logo" />
          <a-dropdown>
            <a-button type="link">
              <template #icon>
                <MoreOutlined :style="iconStyle" />
              </template>
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a-button :loading="loginOutLoading" type="link" size="small" @click="loginOut">退出登录</a-button>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
                <span><UserOutlined />{{ item.meta.title }}</span>
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
            <router-link v-if="!item.meta.title" :to="item.path"> <HomeOutlined /> 仪表盘 </router-link>
            <router-link v-else :to="item.path"> {{ item.meta.title }} </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content">
          <a-spin :spinning="viewSpin" tip="加载中..." class="spinSwap">
            <router-view v-if="!viewSpin"></router-view>
          </a-spin>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center', padding: '8px' }">
          next-admin©2020 备案号：
          <a href="https://beian.miit.gov.cn/" target="blank">赣ICP备18004347号-1</a>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, HomeOutlined, MoreOutlined, ReloadOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { nextTick, reactive, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useFullscreen from '/@/hooks/useFullscreen'
import { removeAllToken } from '/@/utils/auth'
import menu from '../router/main'
import logo from '/@/assets/svg/logo.svg'
import main from '../router/main'
export default {
  name: 'Ant',
  components: {
    UserOutlined,
    HomeOutlined,
    MoreOutlined,
    ReloadOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  setup() {
    const { children: constantMenu } = menu
    const menuList = reactive(constantMenu)
    const openKeys = reactive([])
    const selectedKeys = reactive([])
    const Router = useRouter()
    const currRoute = useRoute()
    const matchRoute = reactive([])
    const { isFullscreen, setFull, exitFull, toggleFull } = useFullscreen()

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
    const loginOutLoading = ref(false)
    const loginOut = async () => {
      loginOutLoading.value = true
      const res = await new Promise(resolve => {
        setTimeout(() => {
          resolve(200)
        }, 200)
      })
      if (res === 200) {
        // 清除本地localStorage
        const { path } = currRoute
        removeAllToken()
        Router.replace({
          path: '/login',
          query: {
            redirectUrl: path
          }
        })
      }
    }
    const iconStyle = { fontSize: '18px' }
    const viewSpin = ref(false)
    const refreshView = () => {
      viewSpin.value = true
      // nextTick 快到不展示loading
      // nextTick(() => {
      //   viewSpin.value = false
      // })
      setTimeout(() => {
        viewSpin.value = false
      }, 400)
    }
    return {
      menuList,
      selectedKeys,
      openKeys,
      openChange,
      link,
      matchRoute,
      logo,
      isFullscreen,
      toggleFull,
      loginOutLoading,
      loginOut,
      iconStyle,
      // 刷新页面
      viewSpin,
      refreshView
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
    padding: 0 12px !important;
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
      color: ivory;
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
::v-deep(.ant-menu-inline .ant-menu-item) {
  margin-top: 0 !important;
}
.spinSwap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
::v-deep(.ant-spin-nested-loading) {
  width: 100%;
  height: 100%;
  .ant-spin-container {
    width: 100%;
    height: 100%;
  }
}
</style>
