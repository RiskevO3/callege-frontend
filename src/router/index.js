import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification,ElLoading } from 'element-plus'
import { h } from 'vue'
import {useCallegeStore} from '../stores/callege.js'
import NProgress from 'nprogress';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import FaqView from '../views/FaqView.vue'
import AboutView from '../views/AboutView.vue'
import StreamingView from '../views/StreamingView.vue'
import LanggananView from '../views/LanggananView.vue'
import ConfirmLanggananView from '../views/ConfirmLanggananView.vue'

let loading;
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    component: LoginView,
    beforeEnter:(to,from,next)=>{
      if(to.name == 'login'){
        if(useCallegeStore().sessionId){
          next({name:'dashboard'})
        }
        else{
          next()
        }
      }
    }
  },
  {
    path:'/dashboard',
    name:'dashboard',
    // component: () => import('../views/DashboardView.vue'),
    beforeEnter:async (to,from,next)=>{
      if(to.name == 'dashboard'){
        next('/dashboard/profile')
      }
      else{
        next()
      }
    },
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
      },
      {
        path:'subscribe',
        name:'subscribe',
        component:LanggananView
      },
      {
        path:'confirmpayment',
        name:'confirmpayment',
        component:ConfirmLanggananView
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
const routeDashboard = ['faq','about','streaming','subscribe','confirmpayment','dashboard','profile']

router.beforeEach(async (to, from, next) => {
  const tokenSess = localStorage.getItem('tokenSess');
  const callegeStore = useCallegeStore();

  if (tokenSess && !from.name) {
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
    });
    await callegeStore.authUser();
    loading.close();
  }

  if (checkAvailableRoute(to.name, routes)) {
    callegeStore.setRouteHistory(to.name);
    if (routeDashboard.includes(to.name)) {
      if(callegeStore.tokenSess){
        if (callegeStore.isVerif) {
          if (to.name == 'subscribe' || to.name == 'confirmpayment') {
            if (callegeStore.subscribeTime&&callegeStore.subscribeDuration &&callegeStore.totalSubscribePrice) {
              next();
            } 
            else {
              ElNotification({
                title: 'Error',
                message: 'Anda harus membuat request transaksi terlebih dahulu!',
                type: 'error',
              });
              next({ name: 'profile' });
            }
          } 
          else {
            next();
          }
        }
        else if(to.name == 'profile'){
          next();
        } else {
          ElNotification({
            title: 'Perhatian',
            message: h('p', {
              style: 'color:black;font-weight: bold;letter-spacing: 1px;',
            }, 'Tolong isi data diri anda terlebih dahulu sebelum anda dapat mengakses halaman lain!'),
            type: 'warning',
          });
          next({ name: 'profile' });
        }
      }else{
        ElNotification({
          title: 'Error',
          message: h('p', {
            style: 'color:black;font-weight: bold;letter-spacing: 1px;',
          }, 'Anda harus login terlebih dahulu!'),
          type: 'error',
        });
        next({ name: 'login' });
      }
    } else {
      next();
    }
  } else {
    ElNotification({
      title: 'Error',
      message: h('p', {
        style: 'color:black;font-weight: bold;letter-spacing: 1px;',
      }, 'Page not found!'),
      type: 'error',
    });

    const routeHistory = callegeStore.routeHistory;
    next(routeHistory ? { name: routeHistory } : '/');
  }
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
