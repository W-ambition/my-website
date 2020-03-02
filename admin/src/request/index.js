import request from './request'

export const checkLogin = async (data) => {
  //登录
  const result = await request.post("checkLogin", data)
  return result
}

export const getTypeInfo = async () => {
  //获取文章类别信息
  const result = await request.get("getTypeInfo")
  return result
}

export const addArticle = async (data) => {
  //添加文章
  const result = await request.post("addArticle", data)
  return result
}

export const updateArticle = async (data) => {
  //修改文章
  const result = await request.post("updateArticle", data)
  return result
}

export const getArticleList = async (data) => {
  //文章列表
  const result = await request.get("getArticleList", data)
  return result
}

export const delArticle = async (id) => {
  //删除文章
  const result = await request.get(`delArticle/${id}`)
  return result
}

export const getArticleById = async (id) => {
  //根据id获取文章详情
  const result = await request.get(`getArticleById/${id}`)
  return result
}