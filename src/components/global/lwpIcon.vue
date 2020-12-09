<template>
  <svg class="icon" :width="sizePx" :height="sizePx">
    <use :xlink:href="iconSymbol"></use>
  </svg>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'LwpIcon',
  props: {
    iconName: {
      required: true,
      type: String
    },
    size: {
      required: false,
      default: 'small'
    }
  },
  setup(props, ctx) {
    const { iconName, size } = props
    const iconSymbol = computed(() => `#${iconName}`)
    const sizePx = computed(() => {
      if (typeof size === 'number') {
        return `${size}px`
      }
      switch (size) {
        case 'large':
          return '36px'
        case 'medium':
          return '28px'
        case 'small':
          return '20px'
        default:
          return '16px'
      }
    })
    return {
      iconSymbol,
      sizePx
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
  fill: currentColor;
  overflow: hidden;
}
</style>
