import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

// 导入 element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/global.less'

axios.defaults.baseURL = 'http://leju.bufan.cloud/lejuAdmin/'

// 请求拦截
axios.interceptors.request.use((data) => {
  data.headers.token = window.sessionStorage.getItem('token')
  return data
})

// 响应拦截
axios.interceptors.response.use((config) => {
  return config
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
