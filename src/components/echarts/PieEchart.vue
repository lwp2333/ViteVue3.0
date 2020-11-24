<template>
  <a-spin :spinning="loading">
    <div :ref="setRef" class="pie_echart"></div>
  </a-spin>
</template>

<script>
import { ref, onMounted, reactive, defineComponent } from 'vue'
import { pieGradient } from '/@/constant/echartsOption'
import Echarts from 'echarts'
import useWinResize from '/@/hooks/useWinResize'
import useEchartSwipe from '/@/hooks/useEchartSwipe'
import { createLogger } from 'vuex'
export default {
  name: 'PieEchart',
  props: {
    data: {
      type: Array,
      required: true
    },
    colorList: {
      type: Array,
      required: false
    }
  },
  setup(props, contexts) {
    const echartId = ref(null)
    const setRef = el => {
      echartId.value = el
    }
    let myEcharts = null
    const loading = ref(true)
    const initEcharts = async () => {
      console.log(1)
      loading.value = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const { data, colorList } = props
          myEcharts = Echarts.init(echartId.value)
          const option = pieGradient(data, colorList)
          myEcharts.setOption(option)
          console.log(2)
          resolve(false)
          console.log(5)
        }, 2200)
      })
    }
    const resizeEcharts = () => {
      myEcharts && myEcharts.resize()
    }
    onMounted(async () => {
      await initEcharts()
    })
    onMounted(() => {
      console.log(3)
    })
    useWinResize(resizeEcharts)
    useEchartSwipe(myEcharts)
    return {
      setRef,
      echartId,
      loading
    }
  }
}
</script>

<style scoped lang="scss">
.pie_echart {
  width: 100%;
  height: calc(100vh - 270px);
}
</style>
