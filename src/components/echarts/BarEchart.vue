<template>
  <a-spin :spinning="loading">
    <div id="echartId"></div>
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
    let myEcharts = reactive({})
    const loading = ref(true)
    const initEcharts = () => {
      const { xAxisData, yAxisData, color } = props
      myEcharts = Echarts.init(document.getElementById('echartId'))
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
          resolve(false)
        }, 2200)
      })
      initEcharts()
    })
    return {
      myEcharts,
      loading
    }
  }
}
</script>

<style scoped lang="scss">
#echartId {
  width: 100%;
  height: calc(100vh - 270px);
}
</style>
