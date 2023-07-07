<template>
  <div class="container mx-auto max-w-[1440px]">
    <div class=" flex flex-col my-auto lg:grid lg:grid-cols-2">

      <!-- Konten untuk bagian kiri -->
      <div class="p-8 md:p-14 hidden lg:block">
        <div class="flex justify-center mb-6 md:mb-10">
          <img src="../assets/resource/images/login/customerlogin.png" class="w-75p h-auto lg:w-96 lg:h-362" alt="" />
        </div>
        <div class="px-4 md:px-10">
          <h1 class="text-2xl md:text-4xl font-gotham font-semibold pb-2 md:pb-5">
            Welcome {{ isLogin ? 'Back!' : '!' }}
          </h1>
          <p class="text-base lg:text-lg dark:text-secondaryTextDark font-gotham">
            Mulai eksplorasi dan jangkau relasimu lebih luas lagi sekarang juga bersama Callege.
          </p>
        </div>
      </div>

      <!-- Konten untuk bagian kanan -->
      <div class="flex justify-center items-center py-8 px-4 md:px-6 lg:px-8">
        <div class="w-full bg-blue rounded-lg shadow sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white dark:bg-primaryCardDark">
            <div class="flex justify-end items-center mb-14">
              <h1 class="text-sm font-light ml-4 pr-2"><b>{{ isLogin ? 'Belum' : 'Sudah' }} punya akun ?</b></h1>
              <div>
                <button
                  class="bg-primary text-white text-sm px-7 py-3 rounded-full md:text-base hover:bg-sub transition delay-100"
                  style="color: white" @click="switchLogin">
                  {{ isLogin ? 'Daftar' : 'Masuk' }}
                </button>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <h1 class="text-2xl md:text-4xl font-bold font-gotham">
                {{ isLogin ? 'Masuk' : 'Daftar' }}
              </h1>
              <p class="text-sm font-gotham dark:text-secondaryTextDark" sty-le="margin-bottom: 55px">
                Silakan {{ isLogin ? 'masuk' : 'daftar' }} dengan menggunakan akun email SSO atau
                akun kampus yang Anda punya.
              </p>
              <div class="flex justify-center items-center pb-20">
                <button
                  class="flex items-center justify-start px-7 py-2 rounded-full w-full text-primary text-center text-sm font-bold font-gotham transition delay-100"
                  style="background-color: #ebe8fb; transition: background-color 0.3s"
                  onmouseover="this.style.backgroundColor='#E3E1F0';" onmouseout="this.style.backgroundColor='#EBE8FB';"
                  @click="Login">
                  <img src="../assets/resource/images/login/google.png" alt="Google Logo"
                    style="width: 35px; height: 35px; margin-right: 25px" />
                  {{ isLogin ? 'Masuk' : 'Daftar' }} dengan Gmail
                </button>
              </div>
              <p class="text-sm font-light text-gray-700 dark:text-secondaryTextDark justify-center text-center">
                Dengan masuk, Anda menyetujui
                <a href="#" class="font-bold text-[#2a2451] dark:text-primary">
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
import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'
import { h } from 'vue'
import { useCallegeStore } from '../stores/callege'
import { googleAuthCodeLogin } from 'vue3-google-login'
export default {
  name: 'LoginView',
  data() {
    return {
      login: false,
      loading: null
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
        .then(() => {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          googleAuthCodeLogin().then(async (response) => {
            let res = await useCallegeStore().loginUser(response['code'])
            if (res) {
              let auth = await useCallegeStore().authUser()
              if (auth) {
                this.$router.push({ name: 'profile' })
                ElNotification({
                  title: 'Success',
                  message: h('p', { style: 'font-weight:bold;letter-spacing: 1px;' }, `Selamat Datang ${res['name']}!`),
                  type: 'success'
                })
                if (this.loading) {
                  this.loading.close()
                  this.loading = null
                }
              } else {
                ElNotification({
                  title: 'Error',
                  message: h('p', { style: 'font-weight: bold;letter-spacing: 1px;' }, 'Autentikasi Gagal!'),
                  type: 'error'
                })
                if (this.loading) {
                  this.loading.close()
                  this.loading = null
                }
              }
            }
            else {
              ElNotification({
                title: 'Error',
                message: h('p', { style: 'font-weight: bold;letter-spacing: 1px;' }, 'Login Gagal! Gunakan akun kampus pribadi Anda!'),
                type: 'error'
              })
              if (this.loading) {
                this.loading.close()
                this.loading = null
              }
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Cancel'
          })
        })
    }
  }
}
</script>
