import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ '../views/home/home.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/detail/:href',
    name: 'detail',
    component: () => import( /* webpackChunkName: "about" */ '../views/detail/detail.vue'),
    meta: {
      title: '加载中...'
    }
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import( /* webpackChunkName: "about" */ '../views/publish/publish.vue'),
    meta: {
      title: '发布文章'
    }
  },
  {
    path: '/category/:tag',
    name: 'category',
    component: () => import( /* webpackChunkName: "about" */ '../views/category/category.vue'),
    meta: {
      title: '文章分类'
    }
  }, {
    path: '/category',
    redirect: {
      path: '/category/notes'
    }
  }, {
    path: '/user/:id',
    name: 'user',
    component: () => import( /* webpackChunkName: "about" */ '../views/user/user.vue'),
    children: [{
      path: '/user/article',
      name: 'userArticle',
      component: () => import( /* webpackChunkName: "about" */ '../views/user/article.vue'),
      meta: {
        title: '用户中心-文章管理'
      }
    }],
    meta: {
      title: '用户中心',
      isHideFooter: true
    }
  }, {
    path: '/user',
    redirect: {
      name: 'userArticle'
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/**
 * 重写路由的push方法,解决添加相同路径报错问题
 */
const routerErrorPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerErrorPush.call(this, location).catch(error => error)
}
/**
 * 动态添加页面标题
 * @type string
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})
export default router
