import './assets/css/main.css'
import '../node_modules/nprogress/nprogress.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import VueSocketIO from 'vue-3-socket.io'

import vue3GoogleLogin from 'vue3-google-login'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueQrcode from '@chenfengyuan/vue-qrcode'

//AOS animation
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component(VueQrcode.name, VueQrcode)
export const socket = new VueSocketIO({
  connection: `${import.meta.env.VITE_SERVER_HOST}/socket`
})
app.use(vue3GoogleLogin, {
  clientId: '201867067684-0mogqupejpgnghtnqm095e58mvo6uhul.apps.googleusercontent.com',
  scope: 'email profile openid'
})

app.use(socket)
app.mount('#app')
