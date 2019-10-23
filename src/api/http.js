
import axios from 'axios'

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
} 
else if (process.env.NODE_ENV == 'test') {
  axios.defaults.baseURL = 'http://test998/'
}
 else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://api.pingcc.cn'
}
else if (process.env.NODE_ENV == 'build') {
  axios.defaults.baseURL = 'http://build/demo'
}


axios.defaults.timeout = 20000

export function get (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
