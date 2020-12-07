<template>
  <a-spin :spinning="loading">
    <div :ref="setRef" class="pie_echart"></div>
    <div class="markInfo">
      <div class="label">{{ current.name }}</div>
      <div class="value">{{ current.value }}</div>
    </div>
  </a-spin>
</template>

<script>
import { ref, onMounted, reactive, defineComponent } from 'vue'
import { pieGradient } from '/@/constant/echartsOption'
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
    const echartRef = ref(null)
    const setRef = el => {
      echartRef.value = el
    }
    const loading = ref(true)
    const { data, colorList } = props
    const init = async () => {
      loading.value = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(false)
        }, 220)
      })
    }
    onMounted(() => {
      init()
    })
    const clickEvent = e => {
      console.log(e)
    }
    const dataOption = pieGradient(data, colorList)
    const current = useEchartSwipe(echartRef, dataOption, 1800, clickEvent)
    return {
      setRef,
      loading,
      current
    }
  }
}
</script>

<style scoped lang="scss">
.pie_echart {
  width: 100%;
  height: calc(100vh - 270px);
}
.markInfo {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  .label {
    font-size: 28px;
    color: black;
  }
  .value {
    font-size: 24px;
    color: aqua;
  }
  @media screen and (max-width: 414px) {
    .label {
      font-size: 16px;
      color: black;
    }
    .value {
      font-size: 14px;
      color: aqua;
    }
  }
}
</style>
