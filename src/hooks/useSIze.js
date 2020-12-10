import { onMounted, reactive, toRefs, isRef } from 'vue'
/**
 *
 * @param {dom id节点或者 ref句柄} target
 */
export default function useSize(target) {
  const size = reactive({
    width: 0,
    height: 0
  })
  onMounted(() => {
    const targetDom = isRef(target) ? target.value : document.getElementById(target)
    size.width = targetDom.offsetWidth
    size.height = targetDom.offsetHeight
  })
  return { ...toRefs(size) }
}
