import axios from '@/libs/api.request'

/**
 * 修改项目班组
 * @param obj
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const edit = (obj) => {
  let params = new URLSearchParams()
  params.append('object', JSON.stringify(obj))
  // for (let key in obj) {
  //   if (obj[key]) {
  //     params.append(key, obj[key])
  //   }
  // }
  return axios.request({
    url: 'projectCorpTeam/edit',
    data: params,
    method: 'post'
  })
}
