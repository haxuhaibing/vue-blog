import {
  ARTICLE_LIST,
  ARTICLE_CATEGORY,
  ARTICLE_DETAIL,
  ARTICLE_COMMITS,
  CREAT_ARTICLE,
  DELETE_ARTICLE,
  HOT_ARTICLE_LIST,
  CATEGORY_ARTICLE_LIST
} from '@/store/mutation-types.js';
import {
  getArticleList,
  delectArticle,
  getArticleClassify,
  getArticleDetail,
  creatOneArticle,
  postArticleComment,
  getArticleComments
}
from "@/api/index.js"
import {
  cutCharacterString
} from "@/utils/common.js";
const state = {
  articleList: [], //文章列表
  articleClassify: [], //文章分类
  articleDetail: {}, //文章详情
  articleCommits: [], //文章评论
  hotArticleList: [], //热门文章
  categoryArticleList: []
}

// getters
const getters = {
  //截取文章详情页长度
  disposeArticleList: (state) => {

    if (state.articleList.list.length > 0) {
      return state.articleList.list.map(item => ({
        ...item,
        contents: cutCharacterString(item.contents)
      }))
    } else {
      return []
    }

  },
  disposeCategoryArticleList: (state) => {
    if (state.categoryArticleList.length == 0) {
      return []
    }
    return state.categoryArticleList.list.map(item => ({
      ...item,
      contents: cutCharacterString(item.contents)
    }))


  }
}

// mutations
const mutations = {
  //文章列表赋值
  [ARTICLE_LIST](state, payload) {
    state.articleList = payload;
  },
  //分类列表赋值
  [ARTICLE_CATEGORY](state, payload) {
    state.articleClassify = payload;
  },
  [ARTICLE_DETAIL](state, payload) {
    state.articleDetail = payload;
  },
  [ARTICLE_COMMITS](state, payload) {
    state.articleCommits = payload;
  },
  [HOT_ARTICLE_LIST](state, payload) {
    state.hotArticleList = payload;
  },
  [CATEGORY_ARTICLE_LIST](state, payload) {
    state.categoryArticleList = payload;
  },

}

// actions
const actions = {
  //热门推荐
  HOT_ARTICLE_LIST(context, {
    data
  }) {
    return new Promise((resolve) => {
      getArticleList(data).then(res => {
        if (res.code == 200) {
          context.commit(HOT_ARTICLE_LIST, res.data.list || []);
          resolve(res.data)
        }
      });
    })

  },
  //分类列表
  CATEGORY_ARTICLE_LIST(context, {
    data
  }) {
    return new Promise((resolve) => {
      getArticleList(data).then(res => {
        if (res.code == 200) {
          console.log(res)
          context.commit(CATEGORY_ARTICLE_LIST, res.data || []);
          resolve(res.data)
        }
      });
    })

  },
  //文章列表
  ARTICLE_LIST(context, {
    data
  }) {
    return new Promise((resolve) => {
      getArticleList(data).then(res => {
        //console.log(res)
        if (res.code == 200) {
          context.commit(ARTICLE_LIST, res.data || []);
          resolve(res.data)
        }
      });
    })

  },
  //分类列表
  ARTICLE_CATEGORY({
    commit
  }) {
    return new Promise((resolve) => {
      getArticleClassify().then(res => {
        if (res.code == 200) {
          commit(ARTICLE_CATEGORY, res.data || [])
          resolve(res.data)
        }
      });
    })

  }, //删除文章
  [DELETE_ARTICLE]({
    commit
  }, {
    record
  }) {
    let rows = this.state.article.articleList;
    return new Promise((resolve) => {
      delectArticle(record).then(response => {
        if (response.code == 200) {
          let result = rows.filter(item => item.id != record.id)
          commit(ARTICLE_LIST, result || [])
          resolve()
        }
      });
    })


  }, //文章评论
  ARTICLE_COMMITS(context, {
    data
  }) {
    return new Promise(resolve => {
      getArticleComments(data).then(res => {
        context.commit(ARTICLE_COMMITS, res.data || [])
        resolve('done');
      });
    })

  }, //文章详情
  ARTICLE_DETAIL(context, {
    href
  }) {
    return new Promise(resolve => {
      getArticleDetail(href).then(res => {
        context.commit(ARTICLE_DETAIL, res.data || {})
        resolve('done');
      });
    })

  },
  //发布评论
  POSTCOMMIT(context, {
    data
  }) {
    return new Promise(resolve => {
      postArticleComment(data).then(() => {
        resolve('评论成功！')
      })
    })
  },
  //新增文章
  CREAT_ARTICLE({
    dispatch
  }, {
    data
  }) {
    return new Promise(resolve => {
      creatOneArticle(data).then(res => {
        if (res.code == 200) {
          dispatch("ARTICLE_LIST")
          resolve('发布成功')
        }
      });
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
