import axios from 'axios'
import config from './config.js'
import storage from './storage'

let http = axios.create({
  baseURL: config.HOST,
  timeout: 100
})

// 请求拦截器
http.interceptors.request.use(function (req) {
  //eslint-disable-next-line
  console.log('request interceptors: ', req)
  // 如果请求是登陆或注册，直接发请求
  if ( (req.url == '/auth') || (req.url == + '/users' && req.method == 'post') ) {
    return req
  }
  // 其他请求，在header中携带token再发
  req.headers.token = storage.get('token') || ''
  return req
}, function (err) {
  //eslint-disable-next-line
  console.log('request interceptors: ', err)
  return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(function (res) {
  //eslint-disable-next-line
  console.log('response interceptors: ', res)
  return res
}, function (err) {
  //eslint-disable-next-line
  console.log('response interceptors: ', err)
  return Promise.reject(err)
})

export default http