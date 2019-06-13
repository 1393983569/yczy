import axios from '@/libs/api.request'


// 获取经验类型列表
export const getAdmins = (data) => {
  return axios.request({
    url: `/getAdmins?accountType=2`,
    method: 'post'
  })
}

/**
 * 审核账号
 * @param data
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const editAdmin = (data) => {
  let params = new URLSearchParams()
  for (let key in data) {
    if (data[key]) params.append(key, data[key])
  }
  return axios.request({
    url: '/editAdmin',
    data: params,
    method: 'post'
  })
}
