import axios from 'axios'
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
  return response;
}, error => {
  return Promise.reject(error)
})

export default instance;