<template>
  <div class="container">
    <a-tag color="pink" closable @close="log">表单 </a-tag>
    <a-tag color="red" closable @close="log"> 地图 </a-tag>
    <a-tag color="orange" closable @close="log"> 表格</a-tag>
    <a-tag color="green" closable @close="log"> Hooks </a-tag>
    <a-tag color="cyan" closable @close="log"> Echarts </a-tag>
    <div class="flexChange">
      <a-radio-group size="small" v-model:value="currFlexClass" button-style="solid">
        <a-radio-button value="a"> flex-around </a-radio-button>
        <a-radio-button value="b"> flex-between </a-radio-button>
        <a-radio-button value="e"> flex-evenly </a-radio-button>
      </a-radio-group>
    </div>
    <div class="cardlist" :class="currFlexClass">
      <a-card :bordered="true" v-for="(item, index) in colorList" :key="index">
        <template #cover>
          <div class="bg" :class="item.class"></div>
        </template>
        <a-card-meta>
          <template #description> {{ item.text }} </template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'TagView',
  setup() {
    const log = () => {}
    const currFlexClass = ref('a')
    const Router = useRoute()
    const colorList = [
      {
        text: 'primaryColor',
        class: 'bg-01'
      },
      {
        text: 'successColor',
        class: 'bg-02'
      },
      {
        text: 'WarningColor',
        class: 'bg-03'
      },
      {
        text: 'dangerColor',
        class: 'bg-04'
      },
      {
        text: 'infoColor',
        class: 'bg-05'
      }
    ]
    return {
      log,
      currFlexClass,
      colorList
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../style/variables.scss';
@import '../../../style/mixins.scss';
.container {
  .flexChange {
    margin-top: 20px;
  }
  .cardlist {
    margin-top: 20px;
    background-color: #ececec;
    padding: 20px 0px;
  }
}
.ant-card {
  width: 140px;
}
.a {
  @include flex-row-around;
}
.b {
  @include flex-row-between;
}
.e {
  @include flex-row-evenly;
}
.bg {
  height: 100px;
}
.bg-01 {
  background-color: $primaryColor;
}
.bg-02 {
  background-color: $successColor;
}
.bg-03 {
  background-color: $WarningColor;
}
.bg-04 {
  background-color: $dangerColor;
}
.bg-05 {
  background-color: $infoColor;
}
</style>
