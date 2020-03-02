import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { baseURL } from '../config/apiUrl'
const instance = axios.create({
  baseURL,
  withCredentials: true
})
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // if(response.data.data === '没有登录') {
  //   localStorage.removeItem('openId')
  //   console.log(this)
  // }
  // console.log(this)
  return response;
}, error => {
  return Promise.reject(error)
})

export default withRouter(instance);