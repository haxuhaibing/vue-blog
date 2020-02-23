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
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue'),
    meta: {
      title: '登录',
      isHideHeader: true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import( /* webpackChunkName: "about" */ '../views/detail/detail.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import( /* webpackChunkName: "about" */ '../views/publish/publish.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// routes.beforeEach((to, from, next) => {
//   // ...
// })
export default router

// router.routes.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//
// })