<template>
  <div>
    <barChart></barChart>
    <barTickAlign></barTickAlign>
    <echartsTable></echartsTable>
    <div style="margin-top: 100px">
      <information></information>
    </div>
  </div>
</template>
<script>

// import cartogram from './cartogram/cartogram.vue'
import information from './information/information.vue'
import Cookies from 'js-cookie'
import barTickAlign from './echartsTable/barTickAlign'
import echartsTable from './echartsTable/echartsTable'
import barChart from './echartsTable/barChart'
export default({
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newList: [
        {
          // 权限名称
          value: '施工单位管理',
          // 是否展开
          expand: true,
          // 名称
          title: "施工单位管理",
          children: [
            {
              // 子权限名称
              value: "施工项目管理"
            },
            {
              value: "工人管理"
            },
          ]
        }
      ],
      oldList: [
        {
          // 权限名称
          value: '施工单位管理',
          children: [
            {
              // 子权限名称
              value: "施工项目管理",
              name: "sadasd"
            },
            {
              value: "工人管理",
              key: "75644556"
            },
          ]
        }
      ]
    }
  },
  components: {
    // cartogram,
    information,
    barTickAlign,
    echartsTable,
    barChart
  },
  methods: {
    disposeList(n, o) {
      const res = []
      n.forEach((item, index) => {

      })
      return res
    }
  },
  mounted () {
    this.$router.push({
      name: Cookies.get('token_zhihuiminggong')
    })
    // this.disposeList(this.newList, this.oldList)
  }
})
</script>
<style>

</style>
