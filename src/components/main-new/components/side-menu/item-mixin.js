export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName () {
      this.$store.commit('steParentNameList', this.parentItem.name)
      return this.parentItem.name
    },
    children () {
      return this.parentItem.children
    },
    textColor () {
      return this.theme === 'light' ? '#fff' : '#495060'
    }
  }
}
