<template>
  <echarts-item />
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useStore, mapMutations } from 'vuex'
import echartsItem from '../../components/echarts/index.vue'
export default {
  name: 'Echarts',
  components: {
    echartsItem
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
