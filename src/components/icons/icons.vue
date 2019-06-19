<template>
  <!--<i :class="iconName" :style="styles"></i>-->
  <svg class="icon" aria-hidden="true" style="width: 36px; height: 36px; position: relative; top: 10px;">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#5c6b77'
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    styles () {
      return {
        fontSize: `${this.size}px`,
        color: this.color
      }
    },
    iconName () {
      // return `iconfont ${this.type}`
      return `#${this.type}`
    }
  }
}
</script>

<style>

</style>
