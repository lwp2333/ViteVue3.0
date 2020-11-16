<template>
  <div class="container">
    仪表盘
    <div class="box">
      <a-space>
        <a-tag color="purple">
          {{ isFullscreen ? '当前为全屏' : '当前非全屏' }}
        </a-tag>
        <a-switch v-model:checked="isFullscreen" />
        <a-button size="small" type="primary" @click="toggleFull">toggle</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import useFullscreen from '/@/hooks/useFullscreen'
export default {
  name: 'DashBoard',
  setup() {
    const { isFullscreen, setFull, exitFull, toggleFull } = useFullscreen()
    return { isFullscreen, setFull, exitFull, toggleFull }
  }
}
</script>

<style scoped lang="scss"></style>
