<template>
  <div class="container">
    <h2>(x:{{ x }}, y:{{ y }}) count: {{ count }}</h2>
    <a-row :gutter="10">
      <a-col :span="12">
        <a-input-search placeholder="输入时间间隔" size="small" @search="setTime">
          <template #enterButton>
            <a-button type="link" size="small"> 修改间隔 </a-button>
          </template>
        </a-input-search>
      </a-col>
      <a-col :span="6">
        <a-button type="link" size="small" @click="restTime"> 重置间隔 </a-button>
      </a-col>
      <a-col :span="6">
        <a-button type="link" size="small" @click="clear"> 清楚定时器 </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import useMouse from '../../hooks/useMouse'
import useInterval from '../../hooks/useInterval'
export default {
  name: 'hooks',

  setup() {
    const count = ref(0)
    const helloWord = () => {
      count.value++
    }
    const [timer, setTime, restTime, clear] = useInterval(helloWord, 1000, false)
    const { x, y } = useMouse()

    return {
      x,
      y,
      count,
      setTime,
      restTime,
      clear
    }
  }
}
</script>

<style scoped lang="scss"></style>
