import axios from '@/libs/api.request'

// 添加轮播图信息
export const addLaw = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'law/addLaw',
    data: params,
    method: 'post'
  })
}

// 修改轮播图信息
export const updateLaw = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) params.append(key, obj[key])
  }
  return axios.request({
    url: 'law/updateLaw',
    data: params,
    method: 'post'
  })
}

// 删除轮播图信息
export const deleteLaw = (id) => {
  return axios.request({
    url: `law/deleteLaw?id=${id}`,
    method: 'get'
  })
}

// 轮播图列表
export const getPageList = (pageNum) => {
  return axios.request({
    url: `law/getPageList?pageNum=${pageNum}`,
    method: 'get'
  })
}
