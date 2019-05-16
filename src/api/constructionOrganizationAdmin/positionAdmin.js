import axios from '@/libs/api.request'

// 添加职位
export const positionAdd = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/position/add',
    data: params,
    method: 'post'
  })
}

// 查询职位列表
export const getPageList = () => {
  return axios.request({
    url: '/position/getList',
    method: 'post'
  })
}

export const positionEdit = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/position/edit',
    data: params,
    method: 'post'
  })
}
