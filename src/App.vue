<template>
    <!-- 弹窗二级列表
    <Modal v-model="showModel" width="2784" :footer-hide="true" :mask-closable="false">
      <div class="content">
        <div class="title">
          <span>医药产业概况> 入园企业</span>
        </div>
        <div class="list">
          <Table
            stripe
            width="1720"
            height="800"
            :columns="columns6"
            :data="data5"
            :highlight-row="false"
            :disabled-hover="true"
          ></Table>
        </div>
        <div class="pageNavigation">
          <Page :show-total="true" :total="29" />
        </div>
      </div>
    </Modal> -->
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
