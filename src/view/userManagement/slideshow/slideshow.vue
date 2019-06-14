<template>
  <div>
    <Button type="primary" @click="addConfig">添加轮播图</Button>
    <editableTables :columns='columns' :pageTotal='pageTotal' :selectShow="false" v-model="dataList" @getPage='getPageNum'></editableTables>
    <Modal
      v-model="modalAddConfig"
      title="添加轮播图"
      :closable="false"
      :mask-closable="false"
      width="900">
       <addSlideshow @submitState="submitState" :row="row" ref="equipmentManagementRef" />
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
  import { getPageList, deleteLaw } from '@/api/userManagement/slideshow'
  import addSlideshow from './components/addSlideshow'
  import clickImg from '_c/clickImg'
  export default({
    components: {
      editableTables,
      clickImg,
      addSlideshow
    },
    data () {
      return {
        columns: [
          {
            title: '轮播图标题',
            key: 'rotationTitle'
          },
          {
            title: '轮播图访问链接',
            key: 'rotationUrl'
          },
          {
            title: '轮播图图片地址',
            key: 'rotationAddress',
            render: (h, params) => {
              return h('div', [
                h(clickImg, {
                  props: {
                    rePic: [params.row.rotationAddress],
                    cancelShow: false
                  }
                })
              ])
            }
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
                      this.$Modal.confirm({
                        title: '删除',
                        content: '确定要删除吗？',
                        onOk: ()=> {
                          deleteLaw(params.row.id).then(res => {
                            this.$Message.success('成功')
                            this.getList()
                          }).catch(err => {
                            this.$Message.error(err)
                          })
                        }
                      })
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
        row: {}
      }
    },
    methods: {
      // 分页查询管理员
      getList () {
        this.dataList = []
        getPageList(this.pageNum).then(res => {
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
