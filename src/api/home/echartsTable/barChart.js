import axios from '@/libs/api.request'

// 根据学历统计工人
export const getWorkByEdu = () => {
  return axios.request({
    url: 'statistic/getWorkByEdu',
    method: 'get'
  })
}
