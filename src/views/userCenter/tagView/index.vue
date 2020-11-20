<template>
  <div class="container">
    <a-tag color="pink" closable @close="log">表单 </a-tag>
    <a-tag color="red" closable @close="log"> 地图 </a-tag>
    <a-tag color="orange" closable @close="log"> 表格</a-tag>
    <a-tag color="green" closable @close="log"> Hooks </a-tag>
    <a-tag color="cyan" closable @close="log"> Echarts </a-tag>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'TagView',
  setup() {
    const log = () => {}
    const Router = useRoute()
    console.log(Router)
    return {
      log
    }
  }
}
</script>

<style scoped lang="scss"></style>
