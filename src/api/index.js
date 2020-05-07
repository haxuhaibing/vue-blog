import {
  post
} from '@/utils/http'
/**
 * 获取文章列表
 */
export const getArticleList = () => {
  return post("/article/list")
}
/**
 * 删除一行文章
 */
export const delectArticle = (record) => {
  return post("/article/delete", {
    id: record.id
  })
}

/**
 * 获取文章分类
 */
export const getArticleClassify = () => {
  return post("/cate/cateType")
}
/**
 * 获取文章详情
 */
export const getArticleDetail = (data) => {
  return post("article/detail", data)
}
/**
 * 新增文章
 */
export const creatOneArticle = (data) => {
  return post("article/publishArticle", data)
}

/**
 * 新增文章
 */
export const postArticleComment = (data) => {
  return post("article/comment", data)
}
