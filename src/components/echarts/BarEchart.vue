<template>
  <a-spin :spinning="loading">
    <div :ref="setRef" class="bar_echart"></div>
  </a-spin>
</template>

<script>
import { ref, onMounted, reactive, defineComponent } from 'vue'
import { barGradient2 } from '/@/constant/echartsOption'
import Echarts from 'echarts'
import useWinResize from '/@/hooks/useWinResize'
export default {
  name: 'BarEchart',
  props: {
    xAxisData: {
      type: Array,
      required: true
    },
    yAxisData: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      required: false
    }
  },
  setup(props, contexts) {
    const echartId = ref(null)
    const setRef = el => {
      echartId.value = el
    }
    let myEcharts = reactive({})
    const loading = ref(true)
    const initEcharts = () => {
      const { xAxisData, yAxisData, color } = props
      myEcharts = Echarts.init(echartId.value)
      const option = barGradient2(xAxisData, yAxisData, color)
      myEcharts.setOption(option)
    }
    const resizeEcharts = () => {
      myEcharts.resize()
    }
    useWinResize(resizeEcharts)
    onMounted(async () => {
      loading.value = await new Promise((resolve, reject) => {
        setTimeout(() => {
          initEcharts()

          resolve(false)
        }, 2200)
      })
    })
    return {
      echartId,
      setRef,
      myEcharts,
      loading
    }
  }
}
</script>

<style scoped lang="scss">
.bar_echart {
  width: 100%;
  height: calc(100vh - 270px);
}
</style>
