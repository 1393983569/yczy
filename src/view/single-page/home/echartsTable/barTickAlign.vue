<template>
  <div class="table-box">
    <div ref="container" style="height: 350px; padding-top: 20px"></div>
  </div>
</template>

<script>
  import { getWorkBySex } from '@/api/home/echartsTable/barTickAlign'
  export default {
    name: "echartsTable",
    data() {
      return {
        app: {},
        optionData: []
      }
    },
    methods: {
      initContainer () {
        var dom = this.$refs.container
        var myChart = this.$echarts.init(dom)
        myChart.setOption({
          title : {
            text: '男女分布',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['女','男']
          },
          series: [
            {
              name:'男女分布',
              type:'pie',
              radius: ['50%', '40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.optionData
            }
          ]
        }, true)
      },
      getDtaList () {
        this.optionData = []
        getWorkBySex().then(res => {
          for (let key in res.info) {
            let data = {}
            switch (key) {
              case '女':
                data = {
                  name: '女', value: res.info[key]
                }
                break;
              case '男':
                data = {
                  name: '男', value: res.info[key]
                }
                break;
              default:
            }
            this.optionData.push(data)
          }
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
    padding: 0 50px;
    width: 40%;
    display: inline-block;
  }
</style>
