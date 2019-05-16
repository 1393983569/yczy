import axios from '@/libs/api.request'

// 编辑经验类型修改
export const edit = (sid, name) => {
  let params = new URLSearchParams()
  params.append('sid', sid)
  params.append('name', name)
  return axios.request({
    url: '/common/editSalary',
    data: params,
    method: 'post'
  })
}

// 获取薪资类型列表
export const get = (data) => {
  return axios.request({
    url: '/common/getSalarys',
    method: 'post'
  })
}

// 添加薪资类型
export const add = (name) => {
  let params = new URLSearchParams()
  params.append('name', name)
  return axios.request({
    url: '/common/addSalary',
    data: params,
    method: 'post'
  })
}
