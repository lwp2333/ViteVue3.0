import { onMounted, onBeforeUnmount } from 'vue'

export default function useWinRize(Action = () => {}) {
  onMounted(() => {
    window.addEventListener('resize', Action, false)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', Action)
  })
  return null
}
