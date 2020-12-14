<template>
  <svg class="icon" :width="sizePx" :height="sizePx">
    <use :xlink:href="iconSymbol"></use>
  </svg>
</template>

<script>
import { computed, toRefs } from 'vue'
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
    const { iconName, size } = toRefs(props)
    const iconSymbol = computed(() => `#${iconName.value}`)
    const sizePx = computed(() => {
      if (typeof size.value === 'number') {
        return `${size.value}px`
      }
      switch (size.value) {
        case 'large':
          return '36px'
        case 'medium':
          return '28px'
        case 'small':
          return '16px'
        default:
          return '20px'
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
