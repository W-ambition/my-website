import request from './request'

export const getArticleList = async () => {
  //文章列表
  const result = await request.get("getArticleList")
  return result
}

export const getArticleById = async (id) => {
  //文章详情
  const result = await request.get(`getArticleById/${id}`)
  return result
}

export const getTypeInfo = async () => {
  //菜单列表
  const result = await request.get("getTypeInfo")
  return result
}

export const getListById = async (id) => {
  //文章分类列表
  const result = await request.get(`getListById/${id}`)
  return result
}