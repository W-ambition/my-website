import request from './request'

export const checkLogin = async (data) => {
  //登录
  const result = await request.post("checkLogin", data)
  return result
}