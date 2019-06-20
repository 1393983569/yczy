<template>
    <div style="height: 500px; display: flex;">
      <Form ref="formValidate" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="type" label="打卡类型">
          <Select v-model="formInline.type" :disabled="modificationState" @on-change="changeSelectState" style="width:250px" placeholder="打卡类型">
            <Option  value="0">一天刷卡2次</Option>
            <Option  value="1">一天刷卡4次</Option>
          </Select>
        </FormItem>
        <FormItem prop="lateTime" label="设置迟到时间">
          <TimePicker type="time" :disabled="modificationState" v-model="formInline.lateTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
        </FormItem>
        <FormItem prop="lateTime" label="设置早退时间">
          <TimePicker type="time" :disabled="modificationState" v-model="formInline.leaveTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
        </FormItem>
        <!-- <FormItem prop="lateTime" label="下午早退算时间">
          <TimePicker type="time" :disabled="modificationState" v-model="formInline.leaveTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
        </FormItem>
        <FormItem prop="lateTime" label="下午旷工算时间">
          <TimePicker type="time" :disabled="modificationState" v-model="formInline.leaveAbsetTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
        </FormItem> -->
        <div v-if="showFour">
          <FormItem prop="lateTime" label="早上上班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.morningOnTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
          <FormItem prop="lateTime" label="早上下班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.morningOffTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
          <FormItem prop="lateTime" label="下午上班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.afternoonOnTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
          <FormItem prop="lateTime" label="下午下班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.afternoonOffTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
        </div>
        <div v-if="showTow">
          <FormItem prop="lateTime" label="早上上班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.morningOnTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
          <FormItem prop="lateTime" label="下午下班时间">
            <TimePicker type="time" :disabled="modificationState" v-model="formInline.afternoonOffTime" placeholder="请选择时间" style="width: 250px"></TimePicker>
          </FormItem>
        </div>
      </Form>
      <Button style="position: absolute; bottom: 80px; right: 150px" @click="modificationButtonClick" type="primary">
        {{modificationText}}
      </Button>
    </div>
</template>
<script>
  import { setAdd, getData, projectData } from '@/api/constructionOrganizationAdmin/attendanceAdmin/attendanceAdmin'
  export default ({
    data() {
      return {
        msg: "This is a message!",
        formInline: {
          lateTime: '',
          leaveTime: '',
          leaveTime: '',
          leaveAbsetTime: '',
          type: '',
          morningOnTime: '',
          morningOffTime: '',
          afternoonOnTime: '',
          afternoonOffTime: ''
        },
        ruleInline: {

        },
        showTow: false,
        showFour: false,
        modificationState: true,
        modificationText: '修改',
        pid: ''
      }
    },
    methods: {
      changeSelectState(e) {
        if (e + '' === '0') {
          // 两次
          this.showTow = true
          this.showFour = false
        } else {
          // 一次
          this.showFour = true
          this.showTow = false
        }
      },
      modificationButtonClick() {
        if (this.modificationText === '保存') {
          this.addData(this.formInline)
        }
        this.modificationState = !this.modificationState
        this.modificationText = this.modificationState ? '修改' : '保存'
      },
      addData(data) {
        data.accountId = this.$store.state.user.accountId
        setAdd(data).then(res => {
          this.$Message.success('成功')
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      async getDataValue() {
        let project = await projectData()
        let data = await getData(this.$store.state.user.accountId)
        this.pid = project.info.data[0].id
        if (data.info !== null) {
          data.info.type = data.info.type + ''
          this.formInline = data.info
          this.changeSelectState(data.info.type)
        }
      }
    },
    mounted () {
      this.getDataValue()
    }
  })
</script>
<style>

</style>
