<template>
  <div class="container">
    <div id="echartId" @click="login"></div>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore, mapMutations } from 'vuex'
import Echarts from 'echarts'
import { option } from '/@/constant/echartsOption'
import useWinResize from '/@/hooks/useWinResize'
import useInterval from '/@/hooks/useInterval'
export default {
  name: 'Login',
  setup() {
    let myEcharts = reactive({})
    const doing = () => {
      let option = myEcharts.getOption()
      option.series[3].startAngle = option.series[3].startAngle - 1
      myEcharts.setOption(option)
    }
    const [timer, setTime, restTime, clear, startInterval] = useInterval(doing, 120, false)
    const initEcharts = () => {
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
    useWinResize(resizeEcharts)
    const Router = useRouter()
    const login = () => {
      Router.push({ path: '/main' })
    }
    return {
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  #echartId {
    width: 100%;
    height: 100%;
  }
}
</style>
