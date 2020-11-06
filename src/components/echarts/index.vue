<template>
  <div ref="echartRef" id="echartId"></div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useStore, mapMutations } from 'vuex'
import Echarts from 'echarts'
import { option } from '../../constant/echartsOption'
export default {
  name: 'Echarts',
  setup(props) {
    const echartRef = ref(null)
    let myEcharts = reactive(null)
    let timer = reactive(null)

    const doing = () => {
      let option = myEcharts.getOption()
      option.series[3].startAngle = option.series[3].startAngle - 1
      option.series[6].data[0].value = option.series[6].data[0].value + 1
      myEcharts.setOption(option)
    }

    const startTimer = () => {
      timer = setInterval(doing, 100)
    }

    const stopTimer = () => {
      clearInterval(timer)
    }
    const initEcharts = () => {
      const { text, data } = props
      myEcharts = Echarts.init(document.getElementById('echartId'))
      myEcharts.setOption(option)

      myEcharts.on('mouseover', stopTimer)

      myEcharts.on('mouseout', startTimer)

      setTimeout(startTimer, 500)
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
  width: 100%;
  height: 100%;
}
</style>
