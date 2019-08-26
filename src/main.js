import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'http://localhost:5000/'
// 全局配置 axios
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
