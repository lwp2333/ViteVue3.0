<template>
  <div class="dashBoard">
    <PieDash />
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import PieDash from '/@/components/echarts/PieDash.vue'
export default {
  name: 'DashBoard',
  components: {
    PieDash
  },
  setup() {}
}
</script>

<style scoped lang="scss">
.dashBoard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .box {
    margin-bottom: 20px;
  }
}
</style>
