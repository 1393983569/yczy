<template>
  <div>
    <Button type="primary" @click="addConfig">添加设备配置</Button>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="modalAddConfig"
      title="添加设备配置"
      :closable="false"
      :mask-closable="false"
      width="900">
        <equipmentManagement @submitState="submitState" :row="row" ref="equipmentManagementRef" />
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" :loading="modal_loading" @click="addConfigOk">确定</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
  // 基本模板
  import editableTables from '_c/editableTables/editableTables.vue'
  import { getPageList } from '@/api/userManagement/addEquipmentManagement'
  import equipmentManagement from './components/addEquipmentManagement'
  import clickImg from '_c/clickImg'
  export default({
    components: {
      editableTables,
      clickImg,
      equipmentManagement
    },
    data () {
      return {
        columns: [
          {
            title: '设备序列号',
            key: 'sn'
          },
          {
            title: '设备名称',
            key: 'name'
          },
          {
            title: '数据上报IP/域名',
            key: 'dataIp'
          },
          {
            title: '数据上报端口',
            key: 'dataPort'
          },
          {
            title: '配置ip',
            key: 'configIp'
          },
          {
            title: '配置端口',
            key: 'configPort'
          },
          {
            title: '进出状态',
            key: 'type',
            render: (h, params) => {
              let text = ''
              if (params.row.type + '' === '02') {
                text = <span style="color: #3c9e3a">进门</span>
              } else if (params.row.type + '' === '01') {
                text = <span style="color: #03a9f4">出门</span>
              }
              return (
                <div>
                  {text}
                </div>
              )
            }
          },
          {
            title: '项目编号',
            key: 'projectCode'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      params.row.custom = '1'
                      this.row = params.row
                      // this.$refs.equipmentManagementRef.setData(params.row)
                      this.modalAddConfig = true
                    }
                  }
                }, '修改')
              ])
            }
          }
        ],
        // 基本参数
        dataList: [],
        // 查询参数
        selectValue: '',
        // 分页参数
        pageNum: 1,
        pageTotal: 1,
        // 需求参数
        modalAddConfig: false,
        modal_loading: false,
        row: {}
      }
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        getPageList(this.pageNum, this.selectValue).then(res => {
          this.dataList = []
          if (res.info === '暂无数据') {
            this.$Message.error(res.info)
            this.pageTotal = 1
            return
          }
          this.pageTotal = res.info.pageTotal
          this.dataList.push(...res.info.data)
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      // 得到页数
      getPageNum (e) {
        this.pageNum = e
        this.getList()
      },
      // 复位
      restoration () {
        this.accountTitle = ''
        this.accountJob = ''
        this.pageNum = 1
      },
      addConfig () {
        this.$refs.equipmentManagementRef.handleReset()
        this.modalAddConfig = true
      },
      addConfigOk () {
        this.modal_loading = true
        this.$refs.equipmentManagementRef.handleSubmit()
      },
      cancel () {
        this.modal_loading = false
        this.modalAddConfig = false
      },
      submitState (e) {
        if (e) {
          this.modal_loading = false
          this.modalAddConfig = false
          this.getList()
        } else {
          this.modal_loading = false
          this.modalAddConfig = true
        }
      }
    },
    mounted () {
      // 初始化管理员列表
      this.getList()
    }
  })
</script>
<style>
</style>
