import axios from '@/libs/api.request'

// 统计各年龄段的人数
export const getWorkBySex = () => {
  return axios.request({
    url: 'statistic/getWorkBySex',
    method: 'get'
  })
}
