import axios from '@/libs/api.request'

export const attendance = (pageNum, id, month) => {
  let date = month.split('-')
  let url = month ? `attendance/getPageList?id=${id}&pageNum=${pageNum}&month=${new Number(date[1])}&year=${date[0]}` : `attendance/getPageList?id=${id}&pageNum=${pageNum}`
  return axios.request({
    url,
    method: 'get'
  })
}
/**
 * 查询工人考勤列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const statisticGetAttendance = (wId, month, accountId) => {
  let date = month.split('-')
  let url = month ? `statistic/getCount?wId=${wId}&month=${new Number(date[1])}&year=${date[0]}&accountId=${accountId}` : `statistic/getCount?wId=${wId}`
  return axios.request({
    url,
    method: 'get'
  })
}
