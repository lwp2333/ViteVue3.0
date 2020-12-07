<template>
  <div class="container">
    <img :src="notFound" alt="找不到路径或者无权访问" />
    <div class="coutDown">
      <a-button type="primary" shape="round" @click="backHome"> 返回（{{ coutDown }}）</a-button>
    </div>
  </div>
</template>

<script>
import notFound from '/@/assets/svg/404.svg'
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useCountDown from '/@/hooks/useCountDown'
export default {
  name: '404',
  setup() {
    const Router = useRouter()
    const backHome = () => {
      Router.back()
    }
    const num = 5
    const coutDown = useCountDown(backHome, num)
    return {
      notFound,
      backHome,
      coutDown
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/mixins.scss';
.container {
  width: 100%;
  height: 100%;
  @include flex-col-start;
  img {
    width: 36vw;
    object-fit: contain;
  }
  .coutDown {
  }
}
</style>
