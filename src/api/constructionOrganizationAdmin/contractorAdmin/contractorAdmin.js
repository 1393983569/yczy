import axios from '@/libs/api.request'
import clonedeep from 'clonedeep'

export const add = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    params.append(key, obj[key])
  }
  return axios.request({
    url: 'project/add',
    data: params,
    method: 'post'
  })
}

export const getPageList = (projectCode) => {
  return axios.request({
    url: `projectCorp/getPageList?projectCode=${projectCode}`,
    method: 'GET'
  })
}

export const addUnity = (obj) => {
  let params = new URLSearchParams()
  for (let key in obj) {
    if (obj[key]) {
      params.append(key, obj[key])
    }
  }
  return axios.request({
    url: 'projectCorp/add',
    data: params,
    method: 'post'
  })
}

/**
 * 班组退场
 * @param obj
 * @returns {*|never|AxiosPromise<any>|l.default}
 */
export const itemExit = (objData) => {
  let obj = clonedeep(objData)
  let params = new URLSearchParams()
  // params.append('object', JSON.stringify(obj))
  for (let key in obj.bankDomain) {
    obj[key] = obj.bankDomain[key]
  }
  delete obj.bankDomain
  delete obj.subcontractorTypeDomain
  for (let key in obj) {
    if (obj[key]) {
      params.append(key, obj[key])
    }
  }
  return axios.request({
    url: 'projectCorp/exitCorp',
    data: params,
    method: 'post'
  })
}

/**
 * 上传参建单位到住建部
 * @param {*} obj
 */
export const corpUpload = (obj) => {
  let params = new URLSearchParams()
  console.log(obj, '0000000000000000000000')
  for (let key in obj) {
    if (obj[key]) {
      params.append(key, obj[key])
    }
  }
  return axios.request({
    url: 'corp/upload',
    data: params,
    method: 'post'
  })
}
