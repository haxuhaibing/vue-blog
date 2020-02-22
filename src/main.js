import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import {
  Button,
  Form,
  Input,
  Row,
  Col
} from 'ant-design-vue';
import {
  fetch,
  post
} from '@/utils/http'
//highlight.js码高亮配色主题
import '@/assets/css/github.css'
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.post = post
Vue.prototype.fetch = fetch
//
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
