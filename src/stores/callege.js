import { defineStore } from 'pinia'
import axios from 'axios'
export const useCallegeStore = defineStore('videochat', {
  state: () => ({
    routeHistory: localStorage.getItem('routeHistory')
      ? localStorage.getItem('routeHistory')
      : null,
    sessionId: null,
    roomToken: null,
    tokenSess: localStorage.getItem('tokenSess') ? localStorage.getItem('tokenSess') : null,
    roomName: null,
    name: null,
    shortName: null,
    picture: null,
    phone: null,
    jurusan: null,
    universitas: null,
    email: null,
    isVerif: null,
    subscribeTime: 2,
    subscribeDuration: '11 Juli 2023',
    totalSubscribePrice: 200000,
    ngrokUrl: import.meta.env.VITE_SERVER_HOST
  }),
  actions: {
    setRouteHistory(route) {
      this.routeHistory = route
      localStorage.setItem('routeHistory', route)
    },
    async loginUser(code) {
      try {
        let res = await axios.post(`${this.ngrokUrl}/googlelogin`, {
          code: code
        })
        // console.log(res.data)
        // console.log(res.data.success)
        if (res.data.success) {
          // console.log('masuk sini broo')
          this.tokenSess = res.data.data.token
          localStorage.setItem('tokenSess', this.tokenSess)
          return res.data.data
        } else {
          false
        }
      } catch {
        return false
      }
    },
    async updateUser() {
      try {
        let res = await axios.post(`${this.ngrokUrl}/updateaccount`, {
          token: this.tokenSess,
          shortName: this.shortName,
          phone: `0${this.phone}`
        })
        if (res.data.success) {
          return true
        } else {
          return false
        }
      } catch {
        return false
      }
    },
    async authUser() {
      try {
        console.log('jalanin auth')
        if (this.tokenSess) {
          let response = await axios.post(`${this.ngrokUrl}/auth`, {
            token: this.tokenSess
          })
          if (response.data.success) {
            this.isVerif = response.data.verified_account
            this.sessionId = response.data.session_id
            this.name = response.data.name
            this.shortName = response.data.short_name
            this.picture = response.data.picture
            this.email = response.data.email
            this.jurusan = response.data.jurusan
            this.universitas = response.data.universitas
            this.phone = response.data.phone
            return true
          } else {
            this.tokenSess = null
            console.log('auth failed')
            localStorage.removeItem('tokenSess')
            return false
          }
        } else {
          console.log('blum login')
          return false
        }
      } catch {
        return false
      }
    },
    async logoutUser() {
      try {
        let response = await axios.post(`${this.ngrokUrl}/logout`, {
          token: this.tokenSess
        })
        if (response.data.success) {
          this.tokenSess = null
          localStorage.removeItem('tokenSess')
          this.sessionId = null
          this.roomToken = null
          this.roomName = null
          this.name = null
          this.picture = null
          return true
        } else {
          return false
        }
      } catch {
        return false
      }
    },
    async getRoomToken() {
      try {
        console.log('start token')
        if (this.tokenSess && !this.roomToken) {
          let res = await axios.post(`${this.ngrokUrl}/generateroomtoken`, {
            headers: { 'ngrok-skip-browser-warning': true },
            session_token: this.tokenSess
          })
          if (res.data.success) {
            this.roomToken = res.data.roomToken
            return true
          } else {
            return false
          }
        }
        else{
          console.log('udah ada roomtoken')
          return false
        }
      } catch {
        return false
      }
    },
    async getRoomSession(){
      if(this.tokenSess && this.roomToken){
        try{
          let res = await axios.post(`${this.ngrokUrl}/getroomsession`,{
            headers: { 'ngrok-skip-browser-warning': true },
            session_token: this.tokenSess,
            room_token: this.roomToken
          })
          if(res.data.success){
            this.roomName = res.data.room_name
            return true
          }
        }
        catch{
          return false
        }
      }
      else{
        return false
      }
    },
    async leaveWebsite() {
      try {
        if (this.roomToken) {
          console.log('leaving website...')
          await axios
            .post(`${this.ngrokUrl}/endcall`, {
              headers: { 'ngrok-skip-browser-warning': true },
              room_name: this.roomName,
              user_sess: this.sessionId
            })
            .then((response) => {
              if (response.data.success) {
                this.roomToken = null
              }
            })
        } 
        else {
          // console.log('there isnt call to end')
        }
      } catch {
        // console.log('error end call')
      }
    },
    async checkPromoCode(code) {
      try {
        let response = await axios.post(`${this.ngrokUrl}/promocodeverification`, {
          promo_code: code
        })
        if (response.data.success) {
          this.totalSubscribePrice = this.totalSubscribePrice - response.data.discount
          return response.data
        } else {
          return false
        }
      } catch {
        return false
      }
    },
    async clearToken(){
      this.tokenSess = null
      localStorage.removeItem('tokenSess')
    }
  }
})
