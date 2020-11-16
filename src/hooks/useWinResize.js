import { onMounted, onBeforeUnmount } from 'vue'

export default function useWinResize(Action = () => {}) {
  onMounted(() => {
    window.addEventListener('resize', Action, false)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', Action)
  })
  return null
}
