<template>
  <div class="container mx-auto rounded-xl p-10" style="background-color: #eae8fa">
    <div class="flex p-4">
      <div class="w-1/2 pr-4">
        <!-- First Video Content -->
        <div class="bg-gray-200 h-[500px] w-full rounded-3xl">
          <div ref="localVideo" class="video-container">
          </div>
        </div>
      </div>
      <div class="w-1/2 pr-4" v-loading="loadingPartner" :element-loading-text="loadingText" element-loading-background="black">
        <!-- Second Video Content -->
        <div class="bg-gray-200 h-[500px] w-full rounded-3xl" ref="remoteVideo">
        </div>
      </div>
    </div>
    <div class="p-[10px] mx-auto bg-white rounded-lg">
      <ul class="flex justify-center gap-4">
        <li>
          <button
            @click="callHandle"
            class="text-lg border-2 border-purple-500 bg-purple-500 text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90"
          >
            <i :class="{'fas fa-play':callEnded,'fa-solid fa-forward':!callEnded}"></i>
            {{ !callEnded ? 'Skip' : 'Mulai'  }}
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            @click="stopCall"
            :disabled="callEnded"
            >
            <i class="fa-solid fa-stop"></i>
            Stop
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2  items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            @click="toggleMute"
            :disabled="callEnded"
            >
            <i class="fa-solid" :class="{'fa-microphone':!isAudioMuted,'fa-microphone-slash':isAudioMuted}"></i>
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90"
          >
            <i class="fa-solid fa-triangle-exclamation"></i>
            Report User
        </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90"
          >
            <i class="fa-solid fa-filter"></i>
            Options
          </button>
        </li>
      </ul>
    </div>
    <div class="p-4 mx-auto mt-4 bg-white rounded-lg" id="chatBox" style="display: block">
      <!-- Chat Box -->
      <div class="h-[200px] bg-gray-200 rounded-lg">
        <div class="h-full flex flex-col justify-end">
          <!-- Chat messages -->
          <div class="overflow-y-auto">
            <!-- Your chat messages go here -->
            <div v-for="(message,index) in messages" :key="index">
                <b>{{ message.sender }}</b>: {{ message.message }}
            </div>
          </div>
          <!-- Input field -->
          <div class="mt-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              @keyup.enter="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Twilio, { connect, createLocalTracks, createLocalVideoTrack } from 'twilio-video'
import { useCallegeStore } from '../stores/callege'
import { reactive, toRaw } from 'vue'
import { ElNotification,ElLoading } from 'element-plus'
export default {
  name: 'StreamingView',
  data(){
    return{
        localTracks: null,
        isAudioMuted: false,
        isVideoStart:false,
        callEnded: true,
        activeRoom:null,
        newMessage:'',
        messages:[],
        loadingScreen : null,
        loadingPartner:false,
        elementLoadingText:null
    }
  },
  computed:{
    loadingText(){
      return this.elementLoadingText
    }
  },
  beforeUnmount() {
  return new Promise(async (resolve, reject) => {
    try {
      await useCallegeStore().leaveWebsite();
      if (this.localTracks) {
        toRaw(this.localTracks).forEach((track) => {
          track.stop();
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
  },
  mounted(){
    return new Promise(async(resolve,reject)=>{
      try{
        this.startLocalCam()
        window.addEventListener('beforeunload', this.handleBeforeUnload)
        resolve()
      }
      catch(error){
        reject(error)
      }
    })
  },
  beforeDestroy(){
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  },
  methods: {
    handleBeforeUnload() {
      console.log('run here')
      useCallegeStore().leaveWebsite()
    },
    async startLocalCam() {
      const mediaContainer = this.$refs.localVideo
      await createLocalTracks({ audio: true, video: true}).then((Tracks) => {
        this.localTracks = reactive(Tracks)
        Tracks.forEach((track) => {
          mediaContainer.appendChild(track.attach())
        })
      })
    },
    async callHandle(){
      this.loadingScreen = ElLoading.service({
        lock:true,
        text:'Loading...',
        background:'rgba(0,0,0,0.7)'
      })
      console.log(this.callEnded)
      if(!this.callEnded){
        this.elementLoadingText = 'Leaving Room...'
        this.eleementloadingPartner = true
        const mediaContainer = this.$refs.remoteVideo
        mediaContainer.innerHTML = ''
        try{
          toRaw(this.activeRoom).disconnect()
        }
        catch{
          console.log('error')
        }
        if(useCallegeStore().roomToken){
          this.$socket.emit('leaveRoom',{room_session:useCallegeStore().roomName})
          await useCallegeStore().endCallSession()
          console.log('masuk ketoken mekk')
          this.callEnded = true
        }
      }
      await useCallegeStore().getRoomToken()
      if(this.loadingScreen){
        this.loadingScreen.close()
      }
      this.$socket.emit('joinRoom',{room_session:useCallegeStore().roomName})
      ElNotification({
        title:'success!',
        message:'Kamu berhasil connect ke room',
        type:'info'
      })
      this.startVideoChat()
      this.callEnded = false
    },
    async stopCall(){
      if(!this.callEnded){
        this.loadingPartner = false
        this.loadingScreen = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        console.log('kesini')
        try{
          await toRaw(this.activeRoom).disconnect();
        }
        catch(error){
          console.log(error)
        }
        const mediaContainer = this.$refs.remoteVideo
        mediaContainer.innerHTML = ''
        if (useCallegeStore().roomToken) {
          this.$socket.emit('leaveRoom', { room_session: useCallegeStore().roomName })
          await useCallegeStore().endCallSession()
          this.callEnded = true
        }
        this.loadingScreen.close()
        ElNotification.success({
          title:'success!',
          message:'call ended'
        })
      }
      else{
        console.log('call not yet start')
      }
    },
    startVideoChat() {
      connect(useCallegeStore().roomToken, {
        name: useCallegeStore().roomName,
        Tracks: this.localTracks
      }).then((room) => {
        const mediaContainer = this.$refs.remoteVideo
        mediaContainer.innerHTML = ''
        this.activeRoom = reactive(room)
        room.participants.forEach((participant) => {
          const div = document.createElement('div')
          div.classList.add('video-container')
          div.id = participant.sid
          mediaContainer.appendChild(div)
          participant.tracks.forEach((publication) => {
            // check if participant accepted video and audio access
            if (publication.track) {
              const track = publication.track
              div.appendChild(track.attach())
            }
          })
          participant.on('trackSubscribed', (track) => {
            console.log('track subscribed')
            this.loadingPartner = this.loadingPartner ? false : false
            if(!document.querySelector('.el-notification--success')){
                ElNotification.success({
                title:'success!',
                message:'you are connecting to new participan'
              })
            }
            div.appendChild(track.attach())
          })
        })
        room.on('participantConnected', (participant) => {
          mediaContainer.innerHTML = ''
          console.log('participant connected')
          const div = document.createElement('div')
          div.classList.add('video-container')
          div.id = participant.sid
          mediaContainer.appendChild(div)
          participant.tracks.forEach((publication) => {
            const track = publication.track
            // check if participant accepted video and audio access
            if (publication.isSubscribed) {
              div.appendChild(track.attach())
            }
          })
          participant.on('trackSubscribed', (track) => {
            this.loadingPartner = this.loadingPartner ? false : false
            if(!document.querySelector('.el-notification--success')){
              ElNotification.success({
                title:'success!',
                message:'you are connecting to new participan'
              })
            }
            // this.loadingToast = null
            // }
            console.log('track subscribed')
            div.appendChild(track.attach())
          })
        })
        room.on('disconnected', (room) => {
          // Detach the local media elements
          console.log('disconected')
          this.messages = []
          room.localParticipant.tracks.forEach((publication) => {
            publication.track.stop() // stop all tracks
            const attachedElements = publication.track.detach()
            attachedElements.forEach((element) => element.remove())
          })
          this.activeRoom = null
        })
        room.on('participantDisconnected', (participant) => {
          console.log('participant disconnected.')
          this.activeRoom = null
          const mediaContainer = this.$refs.remoteVideo
          mediaContainer.innerHTML = ''
          this.elementLoadingText = 'mencari partner...'
          this.loadingPartner = true
        })
      })
    },
    toggleMute() {
      toRaw(this.activeRoom).localParticipant.audioTracks.forEach((track)=>{
        if(!this.isAudioMuted){
          track.track.disable();
          console.log(track.track)
          this.isAudioMuted = true
        }
        else{
          track.track.enable();
          console.log(track.track)
          this.isAudioMuted = false
        }
      })
    },
    toggleStart(){
        this.isVideoStart = !this.isVideoStart
    },
    sendMessage(){
        let message = {'sender':useCallegeStore().shortName,'message':this.newMessage}
        this.messages.push(message)
        this.newMessage = ''
    }
  },
  sockets: {
    joinRoomStatus(msg) {
      this.elementLoadingText = 'Mencari partner...'
      this.loadingPartner = true
      console.log(msg)
    },
    leaveRoomStatus(msg) {
      console.log(msg)
    },
    message(msg) {
      console.log(msg)
      if (msg['from'] != useCallegeStore().sessionId) {
        const message = {
          id: Date.now(),
          sender: 'Person2',
          text: msg['message']
        }
        this.messages.push(message)
      }
    },
    getNewToken(msg) {
      console.log('ini dari getnewtoken')
      if (msg['sessionId'] == useCallegeStore().sessionId) {
        this.elementLoadingText = 'Mencari partner...'
        this.loadingPartner = true
        useCallegeStore().roomToken = msg['token']
        useCallegeStore().roomName = msg['room']
        console.log(msg['room'], 'ini roomnya')
        this.$socket.emit('joinRoom', { room_session: useCallegeStore().roomName })
        const mediaContainer = this.$refs.remoteVideo
        mediaContainer.innerHTML = ''
        this.startVideoChat()
      }
    }
  }
}
    // async callHandle() {
    //   this.elementLoadingText = 'Please Wait...'
    //   this.loadingPartner = true
    //   console.log('mulai fungsi')
    //   if (!this.callEnded) {
    //     console.log('kesini')
    //     const mediaContainer = this.$refs.remoteVideo
    //     mediaContainer.innerHTML = ''
    //     if (useCallegeStore().roomToken) {
    //       this.$socket.emit('leaveRoom', { room_session: useCallegeStore().roomName })
    //       await useCallegeStore().endCallSession()
    //       this.callEnded = true
    //     }
    //     this.loadingPartner = false
    //     ElNotification.success({
    //       title:'success!',
    //       message:'call ended'
    //     })
    //   } else if (this.callEnded) {
    //     console.log('kedua')
    //     console.log('mulai kesini lagii')
    //     await useCallegeStore().getRoomToken()
    //     this.$socket.emit('joinRoom', { room_session: useCallegeStore().roomName })
    //     console.log('emit sukses')
    //     this.startVideoChat()
    //     this.callEnded = false
    //     this.elementLoadingText = 'Mencari partner...'
    //     this.loadingPartner = true
    //   }
    // },
</script>
<style>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>