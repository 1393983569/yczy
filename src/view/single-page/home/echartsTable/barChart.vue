<template>
  <div class="table-box">
    <div ref="container" style="height: 350px;"></div>
  </div>
</template>

<script>
  import { getWorkByEdu } from '@/api/home/echartsTable/barChart'
  export default {
    name: "echartsTable",
    data() {
      return {
        app: {},
        optionData: [],
        xAxisData: [],
        valueData: []
      }
    },
    methods: {
      initContainer () {
        var dom = this.$refs.container
        var myChart = this.$echarts.init(dom)
        myChart.setOption({
          title : {
            text: '学历分布',
            x:'center'
          },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: this.valueData
            }
          ]
        }, true)
      },
      getDtaList () {
        this.optionData = []
        this.xAxisData = []
        this.valueData = []
        getWorkByEdu().then(res => {
          res.info.forEach(item => {
            this.xAxisData.push(item.name)
            this.valueData.push(item.count)
          })
          this.initContainer()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getDtaList()
      })
    }
  }
</script>

<style scoped>
  .table-box{
    width: 100%;
    display: inline-block;
  }
</style>
