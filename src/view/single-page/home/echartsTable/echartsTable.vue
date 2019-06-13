<template>
  <div class="table-box">
    <div ref="container" style="height: 350px; padding-top: 20px"></div>
  </div>
</template>

<script>
  import { getWorkByAge } from '@/api/home/echartsTable/echartsTable'
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
        var myChart = this.$echarts.init(dom);
        myChart.setOption({
          title : {
            text: '年龄段',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show : true,
          },
          calculable : true,
          series : [
            {
              name:'年龄段',
              type:'pie',
              radius : [40, 60],
              center : ['53%', '40%'],
              roseType : 'area',
              data: this.optionData
            }
          ]
        }, true)
      },
      getDtaList () {
        this.optionData = []
        getWorkByAge().then(res => {
          for (let key in res.info) {
            let data = {}
            switch (key) {
              case 'age1':
                data = {
                  name: '18岁~29岁', value: res.info[key]
                }
                break;
              case 'age2':
                data = {
                  name: '30岁~39岁', value: res.info[key]
                }
                break;
              case 'age3':
                data = {
                  name: '40岁~49岁', value: res.info[key]
                }
                break;
              case 'age4':
                data = {
                  name: '50岁以上', value: res.info[key]
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
  display: inline-block;
  width: 40%;
}
</style>
