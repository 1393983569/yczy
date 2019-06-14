import axios from '@/libs/api.request'

// 添加轮播图信息
export const addRotation = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'rotation/addRotation',
    data: params,
    method: 'post'
  })
}

// 修改轮播图信息
export const updateRotation = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'rotation/updateRotation',
    data: params,
    method: 'post'
  })
}

// 删除轮播图信息
export const deleteLaw = (id) => {
  return axios.request({
    url: `rotation/deleteLaw?id=${id}`,
    method: 'get'
  })
}

// 轮播图列表
export const getPageList = (pageNum) => {
  return axios.request({
    url: `rotation/getPageList?pageNum=${pageNum}`,
    method: 'get'
  })
}
