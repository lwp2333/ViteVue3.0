import { ref, onMounted, onUnmounted } from 'vue'

export default function useEchartSwipe(instance = null, interval = 2.2, highEvent = () => {}) {
  /**
   * timer
   */
  const timer = null
  let option = null
  /**
   * 挂载监听 mouseover， mousemove 事件
   */

  /**
   *  doing swipe
   */

  /**
   * 获取当前current high item
   */
  onMounted(() => {
    console.log(4)
    // option = instance && instance.getOption()
    // console.log(option)
  })
  onUnmounted(() => {})
  return {}
}
