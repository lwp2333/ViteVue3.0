<template>
  <div ref="echartRef" id="echartId"></div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useStore, mapMutations } from 'vuex'
import Echarts from 'echarts'
import { barGradient } from '../../constant/echartsOption'
export default {
  name: 'Echarts',
  props: {
    x: {
      type: Array,
      required: true
    },
    y: {
      type: Array,
      required: true
    },
    option: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const echartRef = ref(null)
    let myEcharts = null
    const initEcharts = () => {
      const { x, y } = props
      myEcharts = Echarts.init(document.getElementById('echartId'))
      const option = barGradient(x, y)
      myEcharts.setOption(option)
      window.addEventListener('resize', resizeEcharts, false)
    }
    const resizeEcharts = () => {
      myEcharts.resize()
    }
    onMounted(() => {
      initEcharts()
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeEcharts)
    })
    return {
      echartRef
    }
  }
}
</script>

<style lang="scss" scoped>
#echartId {
  height: 100%;
}
</style>
