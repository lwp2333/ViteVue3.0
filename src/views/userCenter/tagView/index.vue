<template>
  <div class="container">
    <a-tag color="pink" closable @close="log">表单 </a-tag>
    <a-tag color="red" closable @close="log"> 地图 </a-tag>
    <a-tag color="orange" closable @close="log"> 表格</a-tag>
    <a-tag color="green" closable @close="log"> Hooks </a-tag>
    <a-tag color="cyan" closable @close="log"> Echarts </a-tag>
    <a-row :gutter="[16, 16]">
      <a-col :xl="12" :sm="24">
        <a-spin :spinning="loading">
          <div id="he-plugin-standard"></div>
        </a-spin>
      </a-col>
      <a-col :xl="12" :sm="24">
        <img :ref="setRef" id="pic" :src="mockPic" @click="getpic" alt="mock" />
      </a-col>
    </a-row>

    <div class="flexChange">
      <a-radio-group size="small" v-model:value="currFlexClass" button-style="solid">
        <a-radio-button value="a"> flex-around </a-radio-button>
        <a-radio-button value="b"> flex-between </a-radio-button>
        <a-radio-button value="e"> flex-evenly </a-radio-button>
      </a-radio-group>
    </div>
    <div class="cardlist" :class="currFlexClass">
      <a-card :bordered="true" :hoverable="true" v-for="(item, index) in colorList" :key="index">
        <template #cover>
          <div class="bg" :class="item.class"></div>
        </template>
        <a-card-meta>
          <template #description> {{ item.text }} </template>
        </a-card-meta>
      </a-card>
    </div>
    <div class="iconList">
      <a-row :gutter="[16, 16]">
        <a-col :span="6" v-for="(item, index) in iconList" :key="index">
          <lwp-icon :iconName="item.className" :size="48" @click="log(item.className)"></lwp-icon>
          <span class="iconName">{{ item.name }}</span>
        </a-col>
      </a-row>
    </div>
    <div class="info">{{ width }}, {{ height }}</div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import iconList from '/@/constant/iconList.js'
import lwpIcon from '../../../components/global/lwpIcon.vue'
import { getMockPic } from '/@/api/mock'
import useSize from '/@/hooks/useSize'
export default {
  name: 'TagView',
  components: {
    lwpIcon
  },
  setup() {
    const log = val => {
      console.log(val)
    }
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
    const mockPic = ref(null)
    const loading = ref(false)
    const picRef = ref(null)
    const setRef = el => {
      picRef.value = el
    }
    const { width, height } = useSize('pic')
    const getpic = async () => {
      loading.value = true
      const res = await getMockPic().catch(() => {
        loading.value = false
      })
      loading.value = false
      if (res) {
        mockPic.value = res.url
      }
    }
    const getWeather = () => {
      window.WIDGET = {
        CONFIG: {
          layout: 1,
          width: 450,
          height: 150,
          background: 1,
          dataColor: 'FFFFFF',
          borderRadius: 5,
          key: '82691ba7262e428c90bdd6553acc3363'
        }
      }
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
      document.getElementsByTagName('head')[0].appendChild(script)
    }
    onMounted(() => {
      getpic()
      getWeather()
    })
    return {
      log,
      currFlexClass,
      colorList,
      iconList,
      mockPic,
      getpic,
      loading,
      setRef,
      width,
      height
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../style/variables.scss';
@import '../../../style/mixins.scss';
.container {
  & > div {
    padding: 20px 12px;
    text-align: center;
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
.ant-col {
  @include flex-col-center;
}
.mockPic {
  @include flex-row-around;
}
:deep(.ant-spin-nested-loading) {
  @include flex-col-center;
}
#pic {
  width: 12vw;
  height: 4vw;
}
</style>
