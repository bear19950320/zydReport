import axios from 'axios'
import store from '@/store'
import { randomString } from '@/util/util.js'

import { MessageBox, Loading } from 'element-ui'
axios.defaults.timeout = 30000
axios.defaults.withCredentials = false
let loadingCount = 0
let loading

const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  // 开启loading 并loadingCount+1
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  // loadingCount--直到loading的请求都结束了再关闭loading窗口
  if (loadingCount === 0) {
    endLoading()
  }
}
// const whiteList = ['/login', '/create', '/forget', '/changePass', '/locking']
// http response 拦截器
axios.interceptors.response.use(res => {
  hideLoading()
  // console.log(res)
  return parseResponse(res)
}, error => {
  hideLoading()
  console.log(error.response)
  if (error.response.data.error && error.response.data.error === 'invalid_token') {
    MessageBox.alert('登录信息已失效，请重新登录').then(() => {
    })
  } else {
    return Promise.reject(error)
  }
})

export default {
  async post (url, params, useForm = false) {
    return request('post', url, params, useForm)
  },
  async put (url, params, useForm = true) {
    return request('put', url, params, useForm)
  },
  async get (url = '', params = {}, useForm = true) {
    return request('get', url, params, useForm)
  },
  async delete (url = '', params, useForm = true) {
    return request('delete', url, params, useForm)
  }
}

async function getRequest(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2])); return null;
}
/**
 * 封装axios请求
 * @param {*} method get/post/put/delete
 * @param {*} url
 * @param {*} params
 * @param {*} useForm 是否是Content-Type：application/x-www-form-urlencoded
 */

async function request (method, url = '', params, useForm = true) {
  showLoading()
  let ct = ''
  let port = '/zydWeb'//
  // let base = 'http://112.74.92.72:8080/jeecg-boot/FSKReportInterpret'
  // let base = 'https://www.zhiyunduan.cn:8080/jeecg-boot'
  // if( getRequest('code') ) {
  let  base = 'http://www.zhiyunduan.cn'
  // } else {
  //   base = 'http://112.74.92.72:8080/jeecg-boot/FSKReportInterpert'
  // }
  let baseUrl = base + port // ' http://112.74.92.72:8080*/'
  // let baseUrl = ''
  // const token = store.getters['user/tokenGetter']
  const user = store.getters['user/userInfoGetter']
  let { userId, role: roleId, token } = user
  userId = '2602'
  url = baseUrl + url
  if (useForm) {
    ct = 'application/x-www-form-urlencoded'
  } else {
    ct = 'application/json'
  }
  let header = {
    'Content-Type': ct
  }
  if (token) {
    header['X-Access-Token'] = token
  }
  const options = {
    headers: header,
    method: method,
    url: url
  }
  const serialNumber = userId + randomString(10)

  let requestParams = Object.assign(params, { serialNumber, role: 'WEB', userId, roleId, appId: '6666' })
  console.log(requestParams,'requestParams')
  if (useForm) {
    options.params = requestParams
  } else {
    options.data = requestParams
  }

  return axios(options)
}
/**
 * response拦截器
 * @param {*} res
 */
function parseResponse (res) {
  if (res.data.respCode && typeof res.data.respCode === 'string') { // 标准接口
    if (res.data.respCode === '0000') {
      return [res.data, true]
    } else if (res.data.respCode.substr(0, 1) === '5') {
      let resErr = { msg: res.data.respMsg }
      return Promise.reject(resErr)
    } else {
      let msg = res.data.errorMsg || res.data.respMsg
      MessageBox.alert(msg, { type: 'error' }).then(() => {
      }) // 全局弹窗

      let errRes = {
        code: res.data.respCode,
        msg: msg,
        data: res.data
      }

      return Promise.reject(errRes)
    }
  } else { // 非标准接口
    if (res.statusCode === 200) {
      return res
    } else if (res.data.error && res.data.error === 'invalid_token') {
      location.reload() // token失效重新登录  && url !== '/api/auth/oauth/logout'
    } else {
      return Promise.reject(res)
    }
  }
}
