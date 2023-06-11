import { defineStore } from 'pinia'
import axios from 'axios'
export const useCallegeStore = defineStore('videochat', {
  state: () => ({
    routeHistory:localStorage.getItem('routeHistory') ? localStorage.getItem('routeHistory') : null,    
    sessionId: null,
    roomToken: null,
    tokenSess: localStorage.getItem('tokenSess') ? localStorage.getItem('tokenSess') : null,
    roomName: null,
    name: null,
    shortName:null,
    picture: null,
    phone:null,
    jurusan: null,
    universitas:null,
    email:null,
    isVerif:null,
    subscribeTime:2,
    subscribeDuration:'11 Juli 2023',
    totalSubscribePrice:200000,
    ngrokUrl: 'http://127.0.0.1:5001'
  }),
  actions: {
    setRouteHistory(route){
      this.routeHistory = route
      localStorage.setItem('routeHistory',route)
    },
    async loginUser(code){
      let res = await axios.post(`${this.ngrokUrl}/googlelogin`,{
        code:code
      })
      console.log(res.data)
      console.log(res.data.success)
      if(res.data.success){
        console.log('masuk sini broo')
        this.tokenSess = res.data.data.token
        localStorage.setItem('tokenSess',this.tokenSess)
        return res.data.data
      }
      else{
        false
      }
    },
    async updateUser(){
      let res = await axios.post(`${this.ngrokUrl}/updateaccount`,{
        token:this.tokenSess,
        shortName:this.shortName,
        phone:`0${this.phone}`,
      })
      if(res.data.success){
        return true
      }
      else{
        return false
      }
    },
    async authUser() {
      if (this.tokenSess) {
        console.log('masuk kesini')
        console.log(this.tokenSess)
        let response = await axios.post(`${this.ngrokUrl}/auth`,{
          token:this.tokenSess
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
          console.log('auth success')
          return true
        }
        else {
          this.tokenSess = null
          console.log('auth failed')
          localStorage.removeItem('tokenSess')
          return false
        }
        // await axios
        //   .post(`${this.ngrokUrl}/auth`, {
        //     token: this.tokenSess
        //   })
        //   .then((response) => {
        //     if (response.data.success) {
        //       this.isVerif = response.data.verified_account
        //       this.sessionId = response.data.session_id
        //       this.name = response.data.name
        //       this.shortName = response.data.short_name
        //       this.picture = response.data.picture
        //       this.email = response.data.email
        //       this.jurusan = response.data.jurusan
        //       this.universitas = response.data.universitas
        //       this.phone = response.data.phone
        //       console.log(this.phone)
        //       console.log('auth success')
        //     } else {
        //       this.tokenSess = null
        //       console.log('auth failed')
        //       localStorage.removeItem('tokenSess')
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //     this.tokenSess = null
        //     localStorage.removeItem('tokenSess')
        //   })
      } 
      else {
        console.log('blum login')
        return false
      }
    },
    async logoutUser() {
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
        console.log('logout success')
        return true
      } else {
        return false
      }
    },
    async getRoomToken() {
      console.log('start token')
      // if (!this.roomToken) {
      //   await axios
      //     .post(`${this.ngrokUrl}/generatetoken`, {
      //       headers: { 'ngrok-skip-browser-warning': true },
      //       session_id: this.sessionId
      //     })
      //     .then((response) => {
      //       if (response.data.success) {
      //         this.roomToken = response.data.token
      //         this.roomName = response.data.room_name
      //         console.log(response.data.token)
      //       } else {
      //         console.log('gagal generate token')
      //       }
      //     })
      // }
      if(!this.roomToken){
        let res = await axios.post(`${this.ngrokUrl}/generatetoken`, {
          headers: { 'ngrok-skip-browser-warning': true },
          session_id: this.sessionId
        })
        if(res.data.success){
          this.roomToken = res.data.token
          this.roomName = res.data.room_name
          return true
        }
        else{
          return false
        }
      }
      return false
    },
    async leaveWebsite() {
      if (this.roomToken) {
        await axios
          .post(`${this.ngrokUrl}/endcall`, {
            headers: { 'ngrok-skip-browser-warning': true },
            room_name: this.roomName,
            user_sess: this.sessionId
          })
          .then((response) => {
            if (response.data.success) {
              this.roomToken = null
              console.log('session ended')
            } else {
              console.log('gagal end session')
            }
          })
      }
      else{
        console.log('there isnt call to end')
      }
    },
    async checkPromoCode(code){
      let response = await axios.post(`${this.ngrokUrl}/promocodeverification`,{
        promo_code:code
      })
      if(response.data.success){
        this.totalSubscribePrice = this.totalSubscribePrice - response.data.discount
        return response.data
      }
      else{
        return false
      }
    },
    // async getSessionId() {
    //   console.log('masuk kesini')
    //   this.sessionId = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    //   await axios
    //     .post(`${this.ngrokUrl}/createuser`, {
    //       headers: { 'ngrok-skip-browser-warning': true },
    //       session_id: this.sessionId
    //     })
    //     .then((response) => {
    //       console.log(response)
    //       if (response.data.success) {
    //         this.sessionId = response.data.session_id
    //         localStorage.setItem('sessionId', this.sessionId)
    //         console.log('ur session is:' + this.sessionId)
    //       } else {
    //         console.log('gagal set session id')
    //       }
    //     })
    // },
    // async getLoginUrl() {
    //   try {
    //     const response = await axios.post(`${this.ngrokUrl}/generateloginurl`)
    //     console.log(response.data)
    //     console.log(response.data.success)
    //     if (response.data.success === true) {
    //       return response.data.token
    //     }
    //   } catch (error) {
    //     console.error(error)
    //     return false
    //   }
    // },
    // async endCallSession() {
    //   await axios
    //     .post(`${this.ngrokUrl}/endcall`, {
    //       headers: { 'ngrok-skip-browser-warning': true },
    //       room_name: this.roomName,
    //       user_sess: this.sessionId
    //     })
    //     .then((response) => {
    //       if (response.data.success) {
    //         this.roomToken = null
    //         console.log('session ended')
    //       } else {
    //         console.log('gagal end session')
    //       }
    //     })
    // },
  }
})
