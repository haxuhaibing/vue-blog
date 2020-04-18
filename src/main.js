import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import hljs from 'highlight.js'
import {
  fetch,
  post
} from '@/utils/http'
import '@/assets/css/github.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/commom.scss'
import '@/assets/js/iconfont.js'
Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.post = post
Vue.prototype.fetch = fetch
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );
Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
