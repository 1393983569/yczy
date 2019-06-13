import axios from '@/libs/api.request'

/**
 * 企业单位性质
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const projectPropertyConstruction = () => {
  return axios.request({
    url: 'corpType/getPageList',
    method: 'get'
  })
}

/**
 * 参建类型
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const subcontractorType = () => {
  return axios.request({
    url: 'subcontractorType/getPageList',
    method: 'get'
  })
}

/**
 * 查询参建单位类型列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const unityType = () => {
  return axios.request({
    url: 'subcontractorType/getPageList',
    method: 'get'
  })
}

/**
 * 获得七牛的token
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const getQiniuToken = () => {
  return axios.request({
    url: 'getQiNiuToken',
    method: 'get'
  })
}

/**
 * 查询文化程度列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const cultureLevelType = () => {
  return axios.request({
    url: 'cultureLevelType/getPageList',
    method: 'get'
  })
}

/**
 * 查询工种列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const workerType = () => {
  return axios.request({
    url: 'workerType/getPageList',
    method: 'get'
  })
}

/**
 * base64 转路径
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const importFile = (base64) => {
  let params = new URLSearchParams()
  params.append('base64', base64)
  return axios.request({
    url: 'worker/importFile',
    data: params,
    method: 'post'
  })
}

/**
 * 查询工人类型列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const workRole = () => {
  return axios.request({
    url: 'workRole/getPageList',
    method: 'get'
  })
}

/**
 * 查询政治面貌列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const politicsType = () => {
  return axios.request({
    url: 'politicsType/getPageList',
    method: 'get'
  })
}

/**
 * 获取银行列表
 */
export const getBankList = () => {
  return axios.request({
    url: `getAdminsList?accountType=3`,
    method: 'get'
  })
}
/**
 * 获取薪资类型列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const commonGetSalarys = () => {
  return axios.request({
    url: '/common/getSalarys',
    method: 'post'
  })
}

/**
 * 获取经验类型列表
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const commonGetExperiences = () => {
  return axios.request({
    url: '/common/getExperiences',
    method: 'post'
  })
}

/**
 * 按照地区查账号
 * @param provinceCode 省ID
 * @param cityCode 市ID
 * @param accountType 类型 1超管 2 施工 3银行 4 人设
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const adminQuery = (provinceCode, cityCode, accountType) => {
  return axios.request({
    url: `/query?provinceCode=${provinceCode}&cityCode=${cityCode}&accountType=${accountType}`,
    method: 'post'
  })
}
