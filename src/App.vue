<template>
  <NavBar />
  <RouterView />
</template>
<script>
import {RouterLink,RouterView} from 'vue-router'
import NavBar from './navbar/NavBar.vue';
import { useCallegeStore } from './stores/callege';
export default{
  name:'App',
  components:{
    NavBar,
    RouterLink,
    RouterView
  },
  sockets:{
    logout(){
      if(useCallegeStore().tokenSess){
        useCallegeStore().clearToken()
        this.$router.replace({name:'login'})
      }
    }
  }
}
</script>