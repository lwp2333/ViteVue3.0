<template>
  <div id="amapBox"></div>
  <div class="action">
    <!-- <a-button type="primary" @click="getGUI"> 显示区块 </a-button> -->
    <a-button type="primary" @click="setGUI">绘制区块</a-button>
    <a-button type="primary" @click="overSetGUI">获取路径</a-button>
  </div>
</template>

<script>
import { ref, reactive, toRaw, watch, computed, toRefs, onMounted } from 'vue'
import regionJson from '/@/constant/region'
export default {
  name: 'Amap',
  setup() {
    let map = reactive({})
    const initAmap = () => {
      map = new AMap.Map('amapBox', {
        center: [116.400274, 39.905812],
        zoom: 14,
        viewMode: '3D'
      })
    }

    // 绘制多边形， 且打开绘制功能
    const path = regionJson

    let polygon = new AMap.Polygon({
      path,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.2,
      fillColor: '#1791fc',
      zIndex: 50,
      bubble: true
    })
    const getGUI = () => {
      map.add(polygon)
      // 缩放地图到合适的视野级别
      map.setFitView()
    }
    onMounted(() => {
      initAmap()
      getGUI()
    })

    let polyEditor = reactive({})
    const setGUI = () => {
      polyEditor = new AMap.PolygonEditor(map, polygon)
      polyEditor.open()
    }
    const overSetGUI = () => {
      const lngLatList = polygon.getPath()
      const path = lngLatList.map(item => {
        const { lng, lat } = item
        return [lng, lat]
      })
      console.log(path)
      polyEditor.close()
    }
    return {
      map,
      polyEditor,
      getGUI,
      setGUI,
      overSetGUI
    }
  }
}
</script>

<style lang="scss" scoped>
#amapBox {
  width: 100%;
  height: 84%;
}
.action {
  width: 100%;
  height: 14%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
