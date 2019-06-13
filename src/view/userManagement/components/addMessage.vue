<template>
    <div style="display: inline-block">
      <Button type="primary" @click="modal = !modal">添加人员</Button>
      <Modal
        v-model="modal"
        title="添加人员基本信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="dataList">
          <div>
            <span>账号: </span><Input v-model="accountName" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>密码: </span><Input v-model="accountPass" placeholder="" style="width: 300px" />
          </div>
          <div>
            <span>姓名: </span><Input v-model="accountTitle" placeholder="" style="width: 300px" />
          </div>
         <div>
            <span>电话: </span><Input v-model="accountPhone" placeholder="" style="width: 300px" />
         </div>
          <div>
            <span>角色: </span>
            <Select v-model="roleId" style="width:300px">
              <Option v-for="(item, index) in jobList" :value="item.id" :key="item.index">{{ item.roleTitle }}</Option>
            </Select>
          </div>
          <div>
            地区: <siteSelect v-model="siteId" :width="'300px'"></siteSelect>
          </div>
        </div>
      </Modal>
    </div>
</template>
<script>
  import { getRoles } from '@/api/userManagement/message'
  import { getObjName } from '@/libs/util'
  import siteSelect from "@/components/siteSelect/siteSelect"
   export default({
     components: {
       siteSelect
     },
      data() {
       return {
          modal: false,
          accountName: '',
          accountPass: '',
          accountTitle: '',
          accountPhone: '',
          roleId: '',
          jobList: [],
          siteId: []
       }
      },
      methods: {
        ok(){
          if (this.accountName && this.accountPass && this.accountTitle && this.accountPhone && this.roleId) {
            let data = {}
            data.accountName = this.accountName
            data.accountPass = this.accountPass
            data.accountTitle = this.accountTitle
            data.accountPhone = this.accountPhone
            // 区分审核状态 管理员自己添加的账号state都为1
            data.state = 1
            data.roleId = this.roleId
            data.areaCode = this.siteId[2]
            data.cityCode = this.siteId[1]
            data.provinceCode = this.siteId[0]
            data.accountJob = getObjName(this.jobList, this.roleId, 'id', 'roleTitle')
            this.$emit('clickOk', data)
            this.restoration()
          } else {
             this.$Message.error('请完善信息')
          }
        },
        cancel() {
          this.restoration()
        },
        restoration() {
          this.accountName = ''
          this.accountPass = ''
          this.accountTitle = ''
          this.accountPhone = ''
          this.siteId = []
          this.roleId = ''
        }
      },
      mounted () {
        getRoles().then(res => {
          res.info.map(item => {
            this.jobList.push({
              roleTitle: item.roleTitle,
              id: item.id
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }
   })
</script>
<style>
  .dataList div{
    margin-bottom: 10px;
  }
</style>
