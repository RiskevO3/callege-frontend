import { defineStore } from 'pinia'
import axios from 'axios'
export const useCallegeStore = defineStore('videochat', {
  state: () => ({
    // roomSession:null,
    sessionId: null,
    token: null,
    tokenSess: localStorage.getItem('tokenSess') ? localStorage.getItem('tokenSess') : null,
    roomName: null,
    name: null,
    picture: null,
    jurusan: null,
    universitas:null,
    email:null,
    isVerif:null,
    ngrokUrl: 'http://127.0.0.1:5001'
  }),
  actions: {
    async authUser() {
      if (this.tokenSess) {
        console.log('masuk kesini')
        console.log(this.tokenSess)
        await axios
          .post(`${this.ngrokUrl}/auth`, {
            token: this.tokenSess
          })
          .then((response) => {
            if (response.data.success) {
              this.isVerif = response.data.verified_account
              this.sessionId = response.data.session_id
              this.name = response.data.name
              this.picture = response.data.picture
              this.email = response.data.email
              this.jurusan = response.data.jurusan
              this.universitas = response.data.universitas
              console.log('auth success')
            } else {
              this.tokenSess = null
              console.log('auth failed')
              localStorage.removeItem('tokenSess')
            }
          })
          .catch((error) => {
            console.log(error)
            this.tokenSess = null
            localStorage.removeItem('tokenSess')
          })
      } else {
        console.log('blum login')
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
        this.token = null
        this.roomName = null
        this.name = null
        this.picture = null
        console.log('logout success')
        return true
      } else {
        return false
      }
    },
    async getSessionId() {
      console.log('masuk kesini')
      this.sessionId = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
      await axios
        .post(`${this.ngrokUrl}/createuser`, {
          headers: { 'ngrok-skip-browser-warning': true },
          session_id: this.sessionId
        })
        .then((response) => {
          console.log(response)
          if (response.data.success) {
            this.sessionId = response.data.session_id
            localStorage.setItem('sessionId', this.sessionId)
            console.log('ur session is:' + this.sessionId)
          } else {
            console.log('gagal set session id')
          }
        })
    },
    async getRoomToken() {
      console.log('start token')
      if (!this.token) {
        await axios
          .post(`${this.ngrokUrl}/generatetoken`, {
            headers: { 'ngrok-skip-browser-warning': true },
            session_id: this.sessionId
          })
          .then((response) => {
            if (response.data.success) {
              this.token = response.data.token
              this.roomName = response.data.room_name
              console.log(response.data.token)
            } else {
              console.log('gagal generate token')
            }
          })
      }
    },
    async getLoginUrl() {
      try {
        const response = await axios.post(`${this.ngrokUrl}/generateloginurl`)
        console.log(response.data)
        console.log(response.data.success)
        if (response.data.success === true) {
          return response.data.token
        }
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async endCallSession() {
      await axios
        .post(`${this.ngrokUrl}/endcall`, {
          headers: { 'ngrok-skip-browser-warning': true },
          room_name: this.roomName,
          user_sess: this.sessionId
        })
        .then((response) => {
          if (response.data.success) {
            this.token = null
            console.log('session ended')
          } else {
            console.log('gagal end session')
          }
        })
    },
    async leaveWebsite() {
      if (this.token) {
        await axios
          .post(`${this.ngrokUrl}/endcall`, {
            headers: { 'ngrok-skip-browser-warning': true },
            room_name: this.roomName,
            user_sess: this.sessionId
          })
          .then((response) => {
            if (response.data.success) {
              this.token = null
              console.log('session ended')
            } else {
              console.log('gagal end session')
            }
          })
      }
    }
  }
})
