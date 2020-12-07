<template>
  <a-config-provider :locale="zhCN">
    <!-- vue3.0配置 -->
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default {
  name: 'App',
  setup() {
    return {
      zhCN
    }
  }
}
</script>
