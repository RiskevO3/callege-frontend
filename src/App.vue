<template>
  <div class="bg-white dark:bg-bgDark text-black dark:text-white">
    <NavBar />
    <RouterView />
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import NavBar from './navbar/NavBar.vue';
import { useCallegeStore } from './stores/callege';
export default {
  name: 'App',
  components: {
    NavBar,
    RouterView
  },
  sockets: {
    logout() {
      if (useCallegeStore().tokenSess) {
        useCallegeStore().clearToken()
        this.$router.replace({ name: 'login' })
      }
    }
  }
}
</script>