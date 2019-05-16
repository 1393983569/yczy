<template>
  <div>
    <Button type="primary" v-show="!showState" style="margin-bottom: 10px" @click="addProfessionState">添加薪资类型</Button>
    <div v-show="showState">
      <Input v-model="profession" :disabled="disabled" placeholder="请输入工资" style="width: 300px; margin-bottom: 10px"/>
      <Button type="primary" style="margin-bottom: 10px" :loading="loading" @click="addPreserve">保存</Button>
      <Button style="margin-bottom: 10px" @click="cancel">取消</Button>
    </div>
    <div v-show="!showState">
      <Input v-model="inputValue" search @on-search="selectData" :disabled="disabled" placeholder="请输入名称" style="width: 300px; margin-bottom: 10px"/>
    </div>
    <Table :columns="columns" :data="data"></Table>
    <Page style="margin-top: 10px" :total="pageTotal * 10" @on-change="pageChange" />
    <Modal
      v-model="modalEdit"
      title="修改">
      <Input v-model="valueEdit" placeholder="请输入" style="width: 300px" />
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { get, edit, add } from '@/api/userManagement/compensation'
export default ({
  data () {
    return {
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.modalEdit = true
                    this.valueEdit = params.row.name
                    this.sid = params.row.sid
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      data: [],
      modalAdd: false,
      showState: false,
      inputValue: '',
      loading: false,
      disabled: false,
      selectValue: '',
      profession: '',
      pageTotal: 1,
      pageNum: 1,
      modalEdit: false,
      valueEdit: '',
      sid: '',
      modal_loading: false
    }
  },
  methods: {
    getList () {
      this.data = []
      get(this.pageNum, this.selectValue).then(res => {
        this.data = []
        if (res.info === '暂无数据') {
          this.$Message.error('暂无数据')
          return
        }
        this.pageTotal = res.info.pageTotal
        res.info.forEach(item => {
          this.data.push({
            name: item.name,
            sid: item.sid,
            loading: false
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    addProfessionState () {
      this.profession = ''
      this.showState = true
    },
    // 保存数据
    addPreserve () {
      this.loading = true
      this.disabled = true
      add(this.profession).then(res => {
        this.loading = false
        this.showState = false
        this.disabled = false
        this.$Message.success('成功')
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消
    cancel () {
      this.showState = ''
      this.inputValue = ''
      this.loading = false
      this.disabled = false
      this.modal_loading = false
      this.modalEdit = false
    },
    // 查询
    selectData (value) {
      this.selectValue = value
      this.getList()
    },
    // 分页
    pageChange (e) {
      this.pageNum = e
      this.getList()
    },
    ok () {
      this.modal_loading = true
      edit(this.sid, this.valueEdit).then(res => {
        this.modal_loading = false
        this.modalEdit = false
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getList()
  }
})
</script>
<style>

</style>
