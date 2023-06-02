import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import {useCallegeStore} from '../stores/callege.js'
import NProgress from 'nprogress';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import FaqView from '../views/FaqView.vue'
import AboutView from '../views/AboutView.vue'
import StreamingView from '../views/StreamingView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    component: LoginView
  },
  {
    path:'/dashboard',
    name:'dashboard',
    // component: () => import('../views/DashboardView.vue'),
    beforeEnter:(to,from,next)=>{
      if(to.name == 'dashboard'){
        next('/dashboard/profile')
      }
      if(useCallegeStore().sessionId){
        if(to.name != 'profile'){
          if(useCallegeStore().isVerif){
            next()
          }
          else{
            ElNotification({
              title:'Info',
              message:'Harap konfirmasi nomor telfon dan juga nama panggilan terlebih dahulu!',
              type:'warning'
            })
            next({name:'profile'})
          }
        }
      else{
        next()
      }
      }
      else{
        ElNotification({
          title:'Error',
          message:'You are not logged in',
          type:'error'
        })
        next('/')
      }
    }
    ,
    children:[
      {
        path:'profile',
        name:'profile',
        component: ProfileView
      },
      {
        path:'faq',
        name:'faq',
        component: FaqView
      },
      {
        path:'about',
        name:'about',
        component: AboutView
      },
      {
        path:'streaming',
        name:'streaming',
        component:StreamingView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes,
  linkActiveClass: 'bg-sub',
})

const checkAvailableRoute = (destination, routes) => {
  for (const route of routes) {
    if (route.name === destination) {
      return true;
    }
    if (route.children && route.children.length > 0) {
      console.log(route.children)
      const childResult = checkAvailableRoute(destination, route.children);
      if (childResult) {
        return true;
      }
    }
  }
  return false;
};

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.beforeEach(async (to, from, next) => {
  await useCallegeStore().authUser()
  if(checkAvailableRoute(to.name,routes)){
    next()
  }
  else{
    ElNotification({
      title:'Error',
      message:'Page not found',
      type:'error'
    })
    next('/')
  }
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
