import {
  post
} from '@/utils/http'

import {
  cutCharacterString
} from "@/utils/common.js";
const state = {
  articleList: [], //文章列表
  articleClassify: [], //文章分类
  articleDetail: {}, //文章详情
  articleCommits: [] //文章评论
}

// getters
const getters = {
  doneArticleList: (state) => {
    return state.articleList.map(item => ({
      ...item,
      contents: cutCharacterString(item.contents)
    }))
  }
}

// mutations
const mutations = {
  //文章列表赋值
  setArticle(state, payload) {
    state.articleList = payload;
  },
  //分类列表赋值
  setArticleClassify(state, payload) {
    state.articleClassify = payload;
  },
  setArticleDetail(state, payload) {
    state.articleDetail = payload;
  },
  setArticleCommits(state, payload) {
    state.articleCommits = payload;
  }
}
// actions
const actions = {
  //文章列表
  setArticle(context) {
    return new Promise((resolve) => {
      post("/article/list").then(res => {
        if (res.code == 200) {
          context.commit('setArticle', res.data || []);
          resolve(res.data)
        }
      });
    })

  },
  //分类列表赋值
  setArticleClassify(context) {
    post("/cate/cateType").then(res => {
      if (res.code == 200) {
        context.commit('setArticleClassify', res.data || [])
      }
    });
  },
  //删除文章
  deleteArticle(context, {
    record
  }) {
    let rows = this.state.article.articleList;
    return new Promise((resolve) => {
      post("/article/delete", {
        id: record.id
      }).then(response => {
        if (response.code == 200) {
          let result = rows.filter(item => item.id != record.id)
          context.commit('setArticle', result || [])
          resolve('done')
        }
      });
    })


  },
  //新增文章
  creatArticle(context, {
    data
  }) {
    post("article/publishArticle", data).then(res => {
      if (res.code == 200) {
        this.dispatch("article/setArticle")
      }
    });
  },
  //文章详情
  articleDetail(context, {
    data
  }) {
    return new Promise(resolve => {
      post("article/detail", data).then(res => {
        context.commit('setArticleDetail', res.data || {})
        resolve('done');
      });
    })

  },
  //文章评论
  articleCommits(context, {
    data
  }) {
    return new Promise(resolve => {
      post("article/getComments", data).then(res => {
        context.commit('setArticleCommits', res.data || [])
        resolve('done');
      });
    })

  },
  //发布评论
  postCommit(context, {
    data
  }) {
    return new Promise(resolve => {
      post("article/comment", data).then(() => {
        resolve('评论成功！')
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
