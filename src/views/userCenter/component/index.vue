<template>
  <a-row :gutter="[20, 20]">
    <a-col :xl="12" :xs="24">
      <a-card>
        <BarEchart :xAxisData="xAxisData" :yAxisData="yAxisData" />
      </a-card>
    </a-col>
    <a-col :xl="12" :xs="24">
      <a-card><PieEchart :data="pieData" /></a-card>
    </a-col>
  </a-row>
</template>

<script>
import { reactive } from 'vue'
import BarEchart from '/@/components/echarts/BarEchart.vue'
import PieEchart from '/@/components/echarts/PieEchart.vue'

export default {
  name: 'Component',
  components: {
    BarEchart,
    PieEchart
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
    const pieData = [
      {
        name: 'first',
        value: 1
      },
      {
        name: 'second',
        value: 2
      },
      {
        name: 'third',
        value: 3
      },
      {
        name: 'fourth',
        value: 4
      },
      {
        name: 'fifth',
        value: 5
      },
      {
        name: 'sixth',
        value: 6
      }
    ]
    return {
      xAxisData,
      yAxisData,
      pieData
    }
  }
}
</script>

<style scoped lang="scss"></style>
