<template>
  <div class="container">
    <!-- <div class="box">
      <a-space>
        <a-tag color="purple">
          {{ isFullscreen ? '当前为全屏' : '当前非全屏' }}
        </a-tag>
        <a-switch v-model:checked="isFullscreen" />
        <a-button size="small" type="primary" @click="toggleFull">toggle</a-button>
      </a-space>
    </div> -->
    <PieDash />
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import PieDash from '/@/components/echarts/PieDash.vue'
import useFullscreen from '/@/hooks/useFullscreen'
export default {
  name: 'DashBoard',
  components: {
    PieDash
  },
  setup() {
    const { isFullscreen, setFull, exitFull, toggleFull } = useFullscreen()
    return { isFullscreen, setFull, exitFull, toggleFull }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
