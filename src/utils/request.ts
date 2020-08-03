// 封装一层 axios
import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.timeout = 16000
axios.defaults.withCredentials = false
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.status && res.status.toString().charAt(0) === '2') {
      // 200
      return res.data
    } else {
      // TODO
      // 400 500 300
      return res
    }
  },
  error => {
    if (error && error.response) {
      // 处理正常请求返回的异常
      // TODO
      try {
        const status = error.response.status
        console.log('异常status: ' + status)
      } catch (error) {
        console.log(error)
      }
    }
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      // 请求超时处理
      // TODO
      console.log('请求超时')
    }
    return Promise.reject(error)
  },
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params = null): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, data = null): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 */
export function _delete(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}
