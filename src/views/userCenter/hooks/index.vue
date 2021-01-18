<template>
  <div class="container">
    <h2>(x:{{ x }}, y:{{ y }}) count: {{ count }}</h2>
    <a-row :gutter="10">
      <a-col :span="16">
        <a-input-search v-model:value="delay" placeholder="输入时间间隔" size="small" @search="setTime">
          <template #enterButton>
            <a-button type="link" size="small"> 修改间隔 </a-button>
          </template>
        </a-input-search>
      </a-col>
      <a-col :span="4">
        <a-button type="link" size="small" @click="restTime"> 重置 </a-button>
      </a-col>
      <a-col :span="4">
        <a-button type="link" size="small" @click="clear"> 停止 </a-button>
      </a-col>
    </a-row>
    <seamlessScroll :height="300" showControl>
      <a-alert message="Success Tips" type="success" show-icon />
      <a-alert message="Informational Notes" type="info" show-icon />
      <a-alert message="Warning" type="warning" show-icon />
      <a-alert message="Error" type="error" show-icon />
      <a-alert
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        show-icon
      />
      <a-alert
        message="Informational Notes"
        description="Additional description and informations about copywriting."
        type="info"
        show-icon
      />
      <a-alert message="Warning" description="This is a warning notice about copywriting." type="warning" show-icon />
      <a-alert message="Error" description="This is an error message about copywriting." type="error" show-icon @click="openInfo" />
    </seamlessScroll>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import useMouse from '/@/hooks/useMouse'
import useInterval from '/@/hooks/useInterval'
import seamlessScroll from '/@/components/global/seamlessScroll.vue'
import { message } from 'ant-design-vue'
export default {
  name: 'hooks',
  components: {
    seamlessScroll
  },
  setup() {
    const count = ref(0)
    const countAdd = () => {
      count.value++
    }
    const delay = ref(1000)
    const [timer, setTime, restTime, clear, startInterval] = useInterval(countAdd, 1000, false)
    const { x, y } = useMouse()
    const openInfo = () => {
      message.info('点击了error')
    }
    return {
      x,
      y,
      count,
      delay,
      setTime,
      restTime,
      clear,
      openInfo
    }
  }
}
</script>

<style scoped lang="scss">
.ant-alert {
  margin: 12px;
}
</style>
