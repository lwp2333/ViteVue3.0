<template>
  <div id="echartId"></div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useStore, mapMutations } from 'vuex'
import Echarts from 'echarts'
import { option } from '/@/constant/echartsOption'
import useWinRize from '/@/hooks/useWinRize'
import useInterval from '/@/hooks/useInterval'
export default {
  name: 'Echarts',
  setup(props) {
    let myEcharts = reactive({})
    const doing = () => {
      let option = myEcharts.getOption()
      option.series[3].startAngle = option.series[3].startAngle - 1
      myEcharts.setOption(option)
    }
    const [timer, setTime, restTime, clear, startInterval] = useInterval(doing, 120, false)
    const initEcharts = () => {
      const { text, data } = props
      myEcharts = Echarts.init(document.getElementById('echartId'))
      myEcharts.setOption(option)

      myEcharts.on('mouseover', clear)

      myEcharts.on('mouseout', startInterval)
    }
    const resizeEcharts = () => {
      myEcharts.resize()
    }
    /**
     * 自定义hook （适应屏幕）
     */
    onMounted(() => {
      initEcharts()
    })
    useWinRize(resizeEcharts)
    return {}
  }
}
</script>

<style lang="scss" scoped>
#echartId {
  width: 100%;
  height: 100%;
}
</style>
