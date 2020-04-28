import {
  post
} from '@/utils/http'
const state = {
  articleList: [],
  articleClassify: []
}

// getters
const getters = {

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
  }
}
// actions
const actions = {
  //文章列表赋值
  setArticle(context) {
    post("/article/list").then(res => {
      if (res.code == 200) {
        context.commit('setArticle', res.data || [])
      }
    });
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
    post("/article/delete", {
      id: record.id
    }).then(response => {
      if (response.code == 200) {
        let result = rows.filter(item => item.id != record.id)
        context.commit('setArticle', result || [])
      }
    });

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
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
