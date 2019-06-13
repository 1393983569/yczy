import axios from '@/libs/api.request'

export const projectCorpTeam = (pageNum, projectCorpId, teamName) => {
  return axios.request({
    url: `projectCorpTeam/getPageList?pageNum=${pageNum}&${teamName ? `teamName=${teamName}` : ''}&projectCorpId=${projectCorpId}`,
    method: 'get'
  })
}

/**
 * 参建单位退场
 * @param obj
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const itemExit = (obj) => {
  let params = new URLSearchParams()
  params.append('object', JSON.stringify(obj))
  return axios.request({
    url: 'projectCorpTeam/itemExit',
    data: params,
    method: 'post'
  })
}
