<template>
  <div>
    <Button type="primary" @click="addConfig">发布职位</Button>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="modalAddConfig"
      title="发布职位"
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
  import { positionAdd, getPageList } from '@/api/constructionOrganizationAdmin/positionAdmin'
  import { commonGetSalarys, commonGetExperiences, workerType } from '@/api/public'
  import equipmentManagement from './components/addPosition'
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
            title: '职位名称',
            key: 'positionName'
          },
          {
            title: '联系人姓名',
            key: 'contactsName'
          },
          {
            title: '联系人电话',
            key: 'contactsMobile'
          },
          {
            title: '职位描述',
            key: 'description'
          },
          {
            title: '薪资',
            key: 'salaryName'
            // render: (h, params) => {
            //   return h('div', this.getSalarys(params.row.salaryName, params.index))
            // }
          },
          {
            title: '经验',
            key: 'experienceName'
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
                      this.modalAddConfig = true
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      params.row.custom = '1'
                      this.row = params.row
                      this.modalAddConfig = true
                      this.$Message.info({
                        render: h => {
                          return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                          ])
                        }
                      });
                    }
                  }
                }, '删除')
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
        row: {},
        salarysList: [],
        experiencesList: [],
        workerTypeList: []
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
          this.dataList.push(...res.info.records)
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
        this.$refs.equipmentManagementRef.handleReset()
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
      },
      async getDictionaries () {
        this.salarysList = await commonGetSalarys()
        this.experiencesList = await commonGetExperiences()
        this.workerTypeList = await workerType()
      },
      async getSalarys (e, index) {
        let text = ''
        let salarysList = await commonGetSalarys()
        salarysList.info.forEach(item => {
          if (item.sid + '' === e + '') {
            this.dataList[index].salaryName = item.name
          }
        })
        console.log(this.dataList)
        return text
      },
      getExperiences (e) {
        let text = ''
        this.experiencesList.info.forEach(item => {
          console.log(item.eid)
          if (item.eid + '' === e) {
            let text = item.name
          }
        })
        return text
      },
      getWorker (e) {
        let text = ''
        this.workerTypeList.forEach(item => {
          if (item.tid === e) {
            let text = item.profession
          }
        })
        return text
      }
    },
    mounted () {
      this.$nextTick(() => {
        // 初始化管理员列表
        this.getDictionaries()
        this.getList()
      })
    }
  })
</script>
<style>
</style>
