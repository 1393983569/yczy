<!-- 级联动 -->
<template>
    <div style="display: inline-block">
      <Cascader @on-change='getSiteDate' placeholder="请选择地址" :data="data" v-model="value" :load-data="loadData" :style="{width: width, display: 'inlineBlock', zindex: '9999'}"></Cascader>
    </div>
</template>
<script>
import { getAreaCodeList } from '@/api/components/siteSelect'
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  methods: {
    loadData (item, callback) {
      item.loading = true
      getAreaCodeList(item.value).then(res => {
        // 获取字段位置
        let lengthValue = res.info[0].id.length - 2
        let compare = res.info[0].id.substring(lengthValue, res.info[0].id.length)
        res.info.forEach(itemData => {
          item.children.push({
            value: itemData.id,
            label: itemData.name,
          })
          item.loading = false
          callback()
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getSiteDate (e) {
      this.$emit('input', e)
      this.$emit('changeCascader', e)
    },
    getAreaCode () {
      this.data = []
      getAreaCodeList().then(res => {
        this.data = []
        res.info.forEach(item => {
          this.data.push({
            value: item.id,
            label: item.name,
            children: [],
            loading: false
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getAreaCode()
  },
  watch: {

  }
}
</script>
<style>
</style>
