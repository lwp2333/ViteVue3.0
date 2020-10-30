<template>
  <barGradient :x="x" :y="y" />
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useStore, mapMutations } from 'vuex'
import barGradient from '../../components/echarts/barGradient.vue'
export default {
  name: 'index',
  components: {
    barGradient
  },
  setup() {
    let x = reactive(['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'])
    let y = reactive([220, 182, 191, 234, 290, 330, 310, 123, 456])
    return {
      x,
      y
    }
  }
}
</script>

<style lang="scss" scoped></style>
