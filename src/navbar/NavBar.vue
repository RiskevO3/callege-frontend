<template>
  <nav class="bg-transparent">
    <div class="flex flex-wrap items-center justify-between ">
      <RouterLink to="/" class="flex items-center logoBrand bg-white dark:bg-bgDark">
        <img src="../assets/resource/images/landing/logo.png"
          class="lg:h-16 md:h-12 sm:h-10 h-10 m-4 px-4 md:px-8 lg:px-12" alt="Flowbite Logo" />
      </RouterLink>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-default" aria-expanded="false" @click="toggleNavbar" v-if="isOnLanding || isDashboard">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 dark:border-bgDark text-gray-900 dark:text-white rounded-lg bg-gray-50 dark:bg-bgDark md:items-center md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <template v-if="isOnLanding">
            <li>
              <a href="#hero4"
                class="block py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:dark:text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 transition hover:scale-105"
                aria-current="page">Why Callege ?</a>
            </li>
            <li>
              <a href="#hero6"
                class="block py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:dark:text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 transition hover:scale-105">Pricing</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:dark:text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 transition hover:scale-105">FAQ</a>
            </li>
            <li>
              <RouterLink :to="isAuth ? '/dashboard' : '/login'"
                class="block py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:bg-gray-100 hover:dark:text-gray-900 md:bg-primary md:px-7 md:py-2 md:text-white md:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105">
                {{ isAuth ? 'Dashboard' : 'Login' }}
              </RouterLink>
            </li>
          </template>
          <template v-if="isDashboard">
            <li>
              <RouterLink to="/dashboard/streaming"
                class="py-2 pl-5 pr-5 rounded hover:bg-gray-100 md:px-7 md:py-2 md:text-black md:dark:text-white md:hover:bg-sub sm:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105 navAitem group-hover:text-white">
                <i class="fa-solid fa-house iconNav"></i>
                <span class="navText"> Beranda</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/dashboard/profile"
                class="py-2 pl-5 pr-5 rounded hover:bg-gray-100 md:px-7 md:py-2 md:text-black md:dark:text-white md:hover:bg-sub sm:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105 navAitem hover:text-white">
                <i class="fa-solid fa-user iconNav"></i>
                <span class="navText"> Profile</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/dashboard/faq"
                class="py-2 pl-5 pr-5 rounded hover:bg-gray-100 md:px-7 md:py-2 md:text-black md:dark:text-white md:hover:bg-sub sm:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105 navAitem hover:text-white">
                <i class="fa-solid fa-headset iconNav"></i>
                <span class="navText"> Bantuan</span>
              </RouterLink>
            </li>
            <!-- <li>
              <RouterLink
                to="/"
                class="py-2 pl-5 pr-5 text-gray-900 rounded hover:bg-gray-100 md:px-7 md:py-2 md:text-black md:hover:bg-sub sm:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105 navAitem hover:text-white"
              >
                <i class="fa-solid fa-link iconNav"></i>
                <span class="navText"> KebijakanPrivasi</span>
              </RouterLink>
            </li> -->
            <li>
              <RouterLink to="/dashboard/about"
                class="py-2 pl-5 pr-5 rounded hover:bg-gray-100 md:px-7 md:py-2 md:text-black md:dark:text-white md:hover:bg-sub sm:hover:bg-sub md:rounded-full md:p-0 transition ease-in-out hover:scale-105 navAitem hover:text-white">
                <i class="fa-solid fa-circle-info iconNav"></i>
                <span class="navText"> Tentang</span>
              </RouterLink>
            </li>
            <li>
              <button
                class="bg-[#E02424] dark:bg-[#771D1D] py-2 pl-5 pr-5 rounded md:px-7 md:py-2 md:text-black md:dark:text-white md:rounded-full md:p-0 transition ease-in-out hover:scale-105 hover:text-white hover:bg-[#F05252] dark:hover:bg-[#9B1C1C]"
                @click="logoutUser">
                <i class="fa-solid fa-right-from-bracket hover:text-white"></i>
                <span class="navText"> Keluar</span>
              </button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { useCallegeStore } from '../stores/callege'
import { ElMessageBox, ElNotification, ElLoading } from 'element-plus'
import { googleLogout } from 'vue3-google-login'
export default {
  name: 'navBar',
  components: {
    RouterLink
  },
  data() {
    return {
      loading: null
    }
  },
  computed: {
    isOnLanding() {
      return this.$route.name == 'home' ? true : false
    },
    isDashboard() {
      const parentRoute = this.$route.matched.find((route) => route.name === 'dashboard')
      let isparent = parentRoute ? true : false
      return isparent
    },
    isAuth() {
      return useCallegeStore().sessionId
    }
  },
  methods: {
    toggleNavbar() {
      var navbar = document.getElementById('navbar-default')
      navbar.classList.toggle('hidden')
    },
    logoutUser() {
      ElMessageBox.confirm(
        'anda akan logout, continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(async () => {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let res = await useCallegeStore().logoutUser()
          if (res) {
            googleLogout()
            this.$router.replace('/')
            ElNotification({
              title: 'Success',
              message: h('p', { style: 'color:black;font-weight: bold;letter-spacing: 1px;' }, 'Logout Berhasil!'),
              type: 'success',
            })
            if (this.loading) {
              this.loading.close()
              this.loading = null
            }
          }
          else {
            ElNotification({
              title: 'Error',
              message: h('p', { style: 'color:black;font-weight: bold;letter-spacing: 1px;' }, 'Logout Gagal!'),
              type: 'error',
            })
            if (this.loading) {
              this.loading.close()
              this.loading = null
            }
          }
        })
        .catch(() => {
          ElNotification({
            title: 'Info',
            message: h('p', { style: 'color:black;font-weight: bold;letter-spacing: 1px;' }, 'anda tidak jadi logout'),
            type: 'info',
          })
        })
    }
  }
}
</script>
<style>
.iconNav {
  color: #7668e3;
}

.navAitem:hover .iconNav {
  color: white;
}

.logoutNav {
  background-color: #7668e3;
}

.logoutNav:hover {
  background-color: red;
}

.logoutNav:hover .iconNav {
  color: white;
}

.bg-sub .iconNav {
  color: white;
}

.bg-sub .navText {
  color: white;
}
</style>
