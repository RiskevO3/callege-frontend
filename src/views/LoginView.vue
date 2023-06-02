<template>
  <div class="lg:grid lg:grid-cols-2" style="min-height: 100vh">
    <div class="p-8 md:p-14 hidden lg:block">
      <!-- Content for grid 1 on desktop -->
      <!-- <div class="flex justify-start items-start mb-6 md:mb-20 px-4 md:px-10">
            </div> -->
      <div class="flex justify-center mb-6 md:mb-10">
        <img
          src="../assets/resource/images/login/customerlogin.png"
          class="w-75p h-auto lg:w-96 lg:h-362"
          alt=""
        />
      </div>
      <div class="px-4 md:px-10">
        <h1 class="text-2xl md:text-4xl font-gotham font-semibold pb-2 md:pb-5">
          Welcome {{ isLogin ? 'Back!' : '!' }}
        </h1>
        <p class="text-base md:text-lg font-gotham">
          Mulai eksplorasi dan jangkau relasimu lebih luas lagi sekarang juga bersama Callege.
        </p>
      </div>
    </div>
    <div>
      <!-- Konten untuk bagian kanan -->
      <div class="flex justify-center items-center py-8 px-4 md:px-6 lg:px-8 xl:px-10">
        <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8" style="background-color: #f2f0fd">
            <div class="flex justify-end items-center mb-14">
              <h1 class="text-sm ml-4 pr-2">{{ isLogin ? 'Belum' : 'Sudah' }} punya akun?</h1>
              <div>
                <button
                  class="bg-primary text-white px-7 py-3 rounded-full hover:bg-sub transition delay-100"
                  style="color: white"
                  @click="switchLogin"
                >
                  {{ isLogin ? 'Daftar' : 'Masuk' }}
                </button>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <h1 class="text-2xl md:text-4xl font-bold font-gotham">
                {{ isLogin ? 'Masuk' : 'Daftar' }}
              </h1>
              <p class="text-sm font-gotham" style="margin-bottom: 55px">
                Silakan {{ isLogin ? 'masuk' : 'daftar' }} dengan menggunakan akun email SSO atau
                akun kampus yang Anda punya.
              </p>
              <div class="flex justify-center items-center pb-20">
                <button
                  class="flex items-center justify-start px-7 py-2 rounded-full w-full text-primary text-center text-sm font-bold font-gotham transition delay-100"
                  style="background-color: #ebe8fb; transition: background-color 0.3s"
                  onmouseover="this.style.backgroundColor='#E3E1F0';"
                  onmouseout="this.style.backgroundColor='#EBE8FB';"
                  @click="Login"
                >
                  <img
                    src="../assets/resource/images/login/google.png"
                    alt="Google Logo"
                    style="width: 35px; height: 35px; margin-right: 25px"
                  />
                  {{ isLogin ? 'Masuk' : 'Daftar' }} dengan Gmail
                </button>
              </div>
              <p class="text-sm font-light text-gray-700 justify-center text-center">
                Dengan masuk, Anda menyetujui
                <a href="#" class="font-bold" style="color: #2a2451">
                  Ketentuan Layanan dan Kebijakan Privasi
                </a>
                dari Callege.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { useCallegeStore } from '../stores/callege'
export default {
  name: 'LoginView',
  data() {
    return {
      login: false,
      tabs: null
    }
  },
  computed: {
    isLogin() {
      return this.login
    }
  },
  methods: {
    switchLogin() {
      this.login = !this.login
    },
    Login() {
      ElMessageBox.confirm('Anda akan dialihkan kehalaman google, lanjutkan?', 'Warning', {
        confirmButtonText: 'Lanjutkan',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async () => {
            let res = await useCallegeStore().getLoginUrl()
            console.log(res)
            if(res){
              console.log('mulai emit')
              try{
                this.$socket.emit('requestUrl',{'token':res})
              }
              catch(err){
                console.log(err)
              }
              console.log('hasil request')
            }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Cancel'
          })
        })
    }
  },
  sockets:{
    requestUrlResponse(msg){
      if(msg['url']){
        this.tabs = window.open(msg['url'])
      }
      else{
        console.log(msg)
      }
    },
    async loginStatus(msg){
      try{
        console.log(msg)
      if(msg['success']){
        useCallegeStore().tokenSess = msg['data']['token']
        localStorage.setItem('tokenSess',msg['data']['token'])
        await useCallegeStore().authUser();
        this.tabs.close()
        this.tabs = null
        this.$router.push({name:'profile'})
        ElNotification({
          title: 'Success',
          message: `Selamat Datang ${msg['data']['name']}!`,
          type: 'success',
        })
      }
      else{
        this.tab.close()
        ElNotification({
          title: 'Error',
          message: 'Login Gagal!',
          type: 'error',
        })
      }
      }
      catch(err){
        console.log(err)
      }
    }
  }
}
</script>
