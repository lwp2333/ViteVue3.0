<template>
  <a-card>
    <BarEchart :xAxisData="xAxisData" :yAxisData="yAxisData" />
  </a-card>
</template>

<script>
import { reactive } from 'vue'
import BarEchart from '/@/components/echarts/BarEchart.vue'
export default {
  name: 'Component',
  components: {
    BarEchart
  },
  setup() {
    const xAxisData = reactive([
      '杭州市',
      '宁波市',
      '温州市',
      '湖州市',
      '嘉兴市',
      '绍兴市',
      '金华市',
      '衢州市',
      '舟山市',
      '台州市',
      '丽水市'
    ])
    const yAxisData = reactive([3.66, 2.86, 1.82, 1.8, 1.53, 1.47, 1.3, 1.25, 1.1, 1.02, 1])
    return {
      xAxisData,
      yAxisData
    }
  }
}
</script>

<style scoped lang="scss">
</style>
