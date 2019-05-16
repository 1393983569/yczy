import axios from '@/libs/api.request'

// 添加考勤设置
export const setAdd = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/set/add',
    data: params,
    method: 'post'
  })
}
// 查询考勤设置
export const getData = (pid) => {
  return axios.request({
    url: `/set/find?pid=${pid}`,
    method: 'get'
  })
}
// 查询项目基本列表
export const projectData = (pid) => {
  return axios.request({
    url: 'project/getPageList',
    method: 'get'
  })
}
