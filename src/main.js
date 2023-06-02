import './assets/css/main.css'
import '../node_modules/nprogress/nprogress.css' 
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueSocketIO from 'vue-3-socket.io'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
export const socket = new VueSocketIO({
    debug:true,
    connection:'http://127.0.0.1:5001/socket',
  })
app.use(socket)
app.mount('#app')
