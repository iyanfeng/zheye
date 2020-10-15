import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

const app = createApp(App)
axios.defaults.baseURL = 'http://apis.imooc.com'
axios.interceptors.request.use((config) => {
  config.params = { ...config.params, icode: 'F2B393DD9280AFE8' }
  return  config
})
app.use(store)
app.use(router)
app.mount('#app')
