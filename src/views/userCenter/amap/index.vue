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
import useWinResize from '/@/hooks/useWinResize'
export default {
  name: 'Amap',
  setup() {
    let map = null
    let currentHighMarker = null // 当前高亮marker
    let markers = []
    let infoModel = null
    const initAmap = () => {
      map = new AMap.Map('amapBox', {
        center: [116.400274, 39.905812],
        mapStyle: 'amap://styles/cd1fad362d36027b85134649732e5c67',
        zoom: 14,
        viewMode: '3D'
      })
      map.on('complete', () => {
        markersLoad()
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
      // getGUI()
    })
    useWinResize(() => {
      map.setFitView()
    })
    let polyEditor = null
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
      polyEditor && polyEditor.close()
    }

    const markersLoad = () => {
      // 刷新marker
      if (markers.length > 0) {
        markers.forEach(item => {
          item.setMap(null)
        })
      }
      const list = [
        [116.411547, 39.919671],
        [116.428702, 39.91034],
        [116.424642, 39.888465],
        [116.387214, 39.890434],
        [116.397954, 39.903703],
        [116.372794, 39.911199]
      ].map((item, index) => {
        return {
          name: `点${index}`,
          text: `${index}.我喜欢你，千言万语，乐此不疲`,
          lng: item[0],
          lat: item[1]
        }
      })
      /** 载入marker */
      list.forEach(item => {
        const markerItem = new AMap.CircleMarker({
          extData: item,
          center: [item.lng, item.lat],
          radius: 10, //3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'rgba(255,198,76,1)',
          strokeWeight: 1,
          strokeOpacity: 1,
          fillColor: 'rgba(255,198,76,0.8)',
          fillOpacity: 0.72,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        /** 监听事件 */
        markerItem.on('mouseover', e => {
          /** 清除上个高亮 */
          currentHighMarker &&
            currentHighMarker.target.setOptions({
              strokeColor: 'rgba(255,198,76,1)',
              fillColor: 'rgba(255,198,76,0.8)',
              radius: 10,
              fillOpacity: 0.72
            })
          infoModel && infoModel.close()

          /**设置当前高亮 */
          currentHighMarker = e
          currentHighMarker.target.setOptions({
            strokeColor: 'rgba(11,106,217, 1)',
            fillColor: 'rgba(11,106,217,1)',
            radius: 14,
            fillOpacity: 1
          })

          /**设置弹窗 */
          const data = currentHighMarker.target.getExtData()
          const { name, text } = data
          const dom = `<div class='markerHoverModal'> <p class="marker_box_title">${name}</p><div >描述: <span>${text}</span> </div></div>`
          infoModel = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: dom,
            offset: new AMap.Pixel(0, -20)
          })
          infoModel.open(map, [data.lng, data.lat])
        })
        markerItem.on('mouseout', e => {
          // /**
          //  * 取消高亮marker样式
          //  */
          currentHighMarker &&
            currentHighMarker.target.setOptions({
              strokeColor: 'rgba(255,198,76,1)',
              fillColor: 'rgba(255,198,76,0.8)',
              radius: 10,
              fillOpacity: 0.72
            })
          infoModel && infoModel.close()
        })
        markerItem.setMap(map)

        /** 存储marker，用于管理 */
        markers.push(markerItem)
      })
    }
    return {
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
  height: 88%;
}
.action {
  width: 100%;
  height: 14%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
::v-deep(.amap-logo) {
  display: none !important;
}
::v-deep(.amap-copyright) {
  display: none !important;
}
</style>
