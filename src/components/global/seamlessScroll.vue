<template>
  <div class="container">
    <a-space v-if="showControl" size="middle">
      <a-radio-group v-model:value="currentSpeed" button-style="solid" size="small">
        <a-radio-button value="low"> 慢 </a-radio-button>
        <a-radio-button value="default"> 中 </a-radio-button>
        <a-radio-button value="fast"> 快 </a-radio-button>
      </a-radio-group>
      <a-switch checked-children="开" un-checked-children="关" v-model:checked="scrollable" />
    </a-space>

    <div class="samlessScrollBox" :style="{ height: `${height}px` }" @mouseover="stopScroll" @mouseleave="reScroll">
      <div :ref="setRef" class="content">
        <!-- 默认内容插槽 -->
        <slot> </slot>
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, toRefs } from 'vue'
export default {
  name: 'SeamlessScroll',
  props: {
    height: {
      required: false,
      default: '360'
    },
    speed: {
      type: String,
      required: false,
      default: 'default'
    },
    showControl: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const { height, speed } = toRefs(props)
    const currentSpeed = ref(speed.value)
    const scrollable = ref(true)
    // 无缝滚动逻辑
    const samlessContentRef = ref(null)
    const setRef = el => {
      samlessContentRef.value = el
    }
    let translateYNum = 0
    let AnimationFrameId = null
    // 帧率map
    const speedMap = {
      low: 33.33, // 30fps,
      default: 16.67, // 60fps
      fast: 11.11 // 90fps
    }
    const step = () => {
      // 标志位，暂停
      if (!scrollable.value) return
      const dom = samlessContentRef.value
      const limit = dom.offsetHeight //边界
      dom.style.transform = `translateY(-${(translateYNum += 1)}px)`
      if (translateYNum >= limit / 2) {
        translateYNum = 0
      }
      setTimeout(() => {
        startScroll()
      }, speedMap[currentSpeed.value])
    }

    const startScroll = () => {
      const RequestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
      AnimationFrameId = RequestAnimationFrame(step)
    }
    const stopScroll = () => {
      const CancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimat
      CancelAnimationFrame(AnimationFrameId)
      // 标志位，暂停
      scrollable.value = false
    }
    const reScroll = () => {
      scrollable.value = true
    }

    // 监听 tool
    watch([scrollable], () => {
      if (!scrollable.value) {
        return
      }
      startScroll()
    })
    onMounted(() => {
      startScroll()
    })
    onUnmounted(() => {
      stopScroll()
    })
    return {
      height,
      scrollable,
      currentSpeed,
      setRef,
      stopScroll,
      reScroll
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  > div:not(:last-child) {
    padding: 16px;
  }
  .samlessScrollBox {
    overflow: hidden;
  }
}
</style>
