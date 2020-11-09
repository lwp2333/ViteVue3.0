<template>
  <a-layout class="layOut">
    <a-layout-header class="header">
      <div class="logo">文案馆</div>
      <div class="right">
        <!-- 其他东西 -->
        <div class="avatar">
          <a-avatar :size="42" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
      <a-layout-sider width="160" collapsedWidth="0" breakpoint="lg" style="background: #fff">
        <a-menu mode="inline" v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys">
          <a-sub-menu key="sub1">
            <template #title>
              <span><user-outlined />用户中心</span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span><laptop-outlined />权限中心</span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span><notification-outlined />组件中心</span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'

export default {
  name: 'Ant',
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
  },
  setup() {
    const selectedKeys1 = ref(['2'])
    const selectedKeys2 = ref(['1'])
    const openKeys = ref(['sub1'])
    return {
      selectedKeys1,
      selectedKeys2,
      openKeys
    }
  }
}
</script>

<style lang="scss" scoped>
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
      border-radius: 24%;
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
  padding: 24px;
  margin: 0;
}
</style>
