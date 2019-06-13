import axios from '@/libs/api.request'

/**
 * 修改项目参建单位
 * @param obj
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const edit = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) {
      params.append(key, obj[key])
    }
  }
  return axios.request({
    url: 'projectCorp/edit',
    data: params,
    method: 'post'
  })
}
