<template>
  <a-row type="flex" justify="center">
    <a-col :xl="8" :md="12" :xs="24">
      <img :src="nodata" alt="" />
    </a-col>
  </a-row>
</template>

<script>
import nodata from '/@/assets/svg/noData.svg'
export default {
  name: 'NoData',
  setup() {
    return {
      nodata
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
