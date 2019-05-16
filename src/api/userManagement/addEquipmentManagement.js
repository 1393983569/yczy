import axios from '@/libs/api.request'

// 添加保存设备配置
export const equipmentConfigAdd = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/equipmentConfig/add',
    data: params,
    method: 'post'
  })
}

// 查询设备配置列表
export const getPageList = () => {
  return axios.request({
    url: '/equipmentConfig/getPageList',
    method: 'get'
  })
}

// 修改设备配置
export const equipmentConfigEdit = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/equipmentConfig/edit',
    data: params,
    method: 'post'
  })
}
