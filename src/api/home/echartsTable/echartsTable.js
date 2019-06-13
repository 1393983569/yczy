import axios from '@/libs/api.request'

// 统计各年龄段的人数
export const getWorkByAge = () => {
  return axios.request({
    url: 'statistic/getWorkByAge',
    method: 'get'
  })
}
