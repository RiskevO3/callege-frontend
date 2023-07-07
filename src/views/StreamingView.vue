<template>
  <div class="container mx-auto rounded-xl p-10 bg-[#eae8fa] dark:bg-[#1F2937]">
    <div class="flex p-4">
      <div class="w-1/2 pr-4">
        <!-- First Video Content -->
        <div class="bg-gray-200 dark:bg-[#374151] h-[500px] w-full rounded-3xl">
          <div ref="localVideo" class="video-container">
          </div>
        </div>
      </div>
      <div class="w-1/2 pr-4" v-loading="loadingPartner" :element-loading-text="loadingText"
        element-loading-background="black">
        <!-- Second Video Content -->
        <div class="bg-gray-200 dark:bg-[#374151] h-[500px] w-full rounded-3xl">
          <div class="video-container" ref="remoteVideo">
            <div class="absolute top-0 right-0 m-4 text-dark font-bold" v-if="!callEnded">{{ formattedCountdown }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[10px] mx-auto bg-white dark:bg-[#374151] rounded-lg">
      <ul class="flex justify-center gap-4">
        <li>
          <button @click="callHandle"
            class="text-lg border-2 border-purple-500 dark:border-[#5145CD] bg-purple-500 dark:bg-[#362F78] text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            :disabled="loadingPartner">
            <i :class="{ 'fas fa-play': callEnded, 'fa-solid fa-forward': !callEnded }"></i>
            {{ !callEnded ? 'Skip' : 'Mulai' }}
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 dark:border-[#BF125D] bg-white dark:bg-[#751A3D] text-purple-500 dark:text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            @click="stopCall" :disabled="callEnded">
            <i class="fa-solid fa-stop"></i>
            Stop
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 dark:border-[#5145CD] bg-white dark:bg-[#362F78] text-purple-500 dark:text-white  text-lg px-4 py-2  items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            @click="toggleMute" :disabled="callEnded">
            <i class="fa-solid" :class="{ 'fa-microphone': !isAudioMuted, 'fa-microphone-slash': isAudioMuted }"></i>
          </button>
        </li>
        <li>
          <button
            class="text-lg border-2 border-purple-500 dark:border-[#5145CD] bg-white dark:bg-[#362F78] text-purple-500 dark:text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90 disabled:opacity-50"
            :disabled="callEnded">
            <i class="fa-solid fa-triangle-exclamation"></i>
            Report User
          </button>
        </li>
        <li>
          <button type="button" data-modal-target="defaultModal" data-modal-toggle="defaultModal"
            class="text-lg border-2 border-purple-500 dark:border-[#5145CD] bg-white dark:bg-[#362F78] text-purple-500 dark:text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
            <i class="fa-solid fa-filter"></i>
            Options
          </button>
        </li>
      </ul>
    </div>
    <Transition>
      <!-- Main modal -->
      <div id="defaultModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                companies around the world are updating their terms of service agreements to comply.
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button data-modal-hide="defaultModal" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                accept</button>
              <button data-modal-hide="defaultModal" type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <div class="p-4 mx-auto mt-4 bg-white dark:bg-[#374151] rounded-lg" id="chatBox" style="display: block">
      <!-- Chat Box -->
      <div class="h-[200px] bg-gray-200 dark:bg-[#4B5563] rounded-lg">
        <div class="h-full flex flex-col justify-end">
          <!-- Chat messages -->
          <div class="overflow-y-auto text-black dark:text-white">
            <!-- Your chat messages go here -->
            <div v-for="(message, index) in messages" :key="index">
              <b>{{ message.sender }}</b>: {{ message.text }}
            </div>
          </div>
          <!-- Input field -->
          <div class="mt-2">
            <input v-model="newMessage" type="text" placeholder="Type your message..."
              class="text-black dark:text-white dark:bg-[#6B7280] w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
              @keyup.enter="sendMessage" :disabled="callEnded" />
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
import { ElNotification, ElLoading } from 'element-plus'
export default {
  name: 'StreamingView',
  data() {
    return {
      countdown: 600,
      isCountdown: false,
      localTracks: null,
      isAudioMuted: false,
      callEnded: true,
      activeRoom: null,
      newMessage: '',
      messages: [],
      loadingScreen: null,
      loadingPartner: false,
      elementLoadingText: null
    }
  },
  computed: {
    loadingText() {
      return this.elementLoadingText
    },
    formattedCountdown() {
      const hours = Math.floor(this.countdown / 3600);
      const minutes = Math.floor((this.countdown % 3600) / 60);
      const seconds = this.countdown % 60;
      return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }
  },
  async beforeMount() {
    await useCallegeStore().getRoomToken()
    window.addEventListener("beforeunload", this.handleBeforeUnload)
  },
  mounted() {
    return new Promise(async (resolve, reject) => {
      try {
        this.startLocalCam()
        resolve()
      }
      catch (error) {
        reject(error)
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload)
  },
  beforeUnmount() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.activeRoom) {
          await toRaw(this.activeRoom).disconnect();
        }
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
  methods: {
    async handleBeforeUnload() {
      if (this.activeRoom) {
        await toRaw(this.activeRoom).disconnect();
      }
    },
    async startLocalCam() {
      const mediaContainer = this.$refs.localVideo
      await createLocalTracks({ audio: true, video: true }).then((Tracks) => {
        this.localTracks = reactive(Tracks)
        Tracks.forEach((track) => {
          mediaContainer.appendChild(track.attach())
        })
      })
    },
    async callHandle() {
      this.loadingScreen = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0,0,0,0.7)'
      })
      if (!this.callEnded) {
        this.callEnded = true
        this.elementLoadingText = 'Leaving Room...'
        this.eleementloadingPartner = true
        const mediaContainer = this.$refs.remoteVideo
        let remoteVideo = mediaContainer.getElementsByTagName('video')
        let remoteAudio = mediaContainer.getElementsByTagName('audio')
        if (remoteVideo.length > 0) {
          remoteVideo[0].remove()
        }
        if (remoteAudio.length > 0) {
          remoteAudio[0].remove()
        }
        try {
          await toRaw(this.activeRoom).disconnect()
        }
        catch {
        }
        if (useCallegeStore().roomToken) {
          this.$socket.emit('leaveRoom', { room_session: useCallegeStore().roomName })
        }
      }
      let response = await useCallegeStore().getRoomSession()
      if (this.loadingScreen) {
        this.loadingScreen.close()
      }
      if (response) {
        this.$socket.emit('joinRoom', { room_session: useCallegeStore().roomName })
        ElNotification({
          title: 'success!',
          message: 'Kamu berhasil connect ke room',
          type: 'success'
        })
        this.startVideoChat()
      }
      else {
        this.callEnded = true
        ElNotification({
          title: 'error!',
          message: 'Kamu gagal connect ke room',
          type: 'error'
        })
      }
    },
    async stopCall() {
      if (!this.callEnded) {
        this.loadingPartner = false
        this.loadingScreen = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        try {
          await toRaw(this.activeRoom).disconnect();
        }
        catch (error) {
        }
        const mediaContainer = this.$refs.remoteVideo
        let remoteVideo = mediaContainer.getElementsByTagName('video')
        let remoteAudio = mediaContainer.getElementsByTagName('audio')
        if (remoteVideo.length > 0) {
          remoteVideo[0].remove()
        }
        if (remoteAudio.length > 0) {
          remoteAudio[0].remove()
        }
        if (useCallegeStore().roomToken) {
          this.$socket.emit('leaveRoom', { room_session: useCallegeStore().roomName })
          this.callEnded = true
        }
        this.loadingScreen.close()
        ElNotification.success({
          title: 'success!',
          message: 'call ended'
        })
      }
    },
    startVideoChat() {
      connect(useCallegeStore().roomToken, {
        name: useCallegeStore().roomName,
        Tracks: this.localTracks
      }).then((room) => {
        this.isAudioMuted = false
        const mediaContainer = this.$refs.remoteVideo
        this.activeRoom = reactive(room)
        room.participants.forEach((participant) => {
          participant.tracks.forEach((publication) => {
            // check if participant accepted video and audio access
            if (publication.track) {
              const track = publication.track
              mediaContainer.appendChild(track.attach())
            }
          })
          participant.on('trackSubscribed', (track) => {
            mediaContainer.appendChild(track.attach())
            if (track.kind == 'video') {
              this.loadingPartner = false
              this.callEnded = false
              this.callEnded = false
              this.countdown = 600
              if (!this.isCountdown) {
                this.startCountdown()
                this.isCountdown = true
              }
              ElNotification.success({
                message: 'you are connecting to participant!...'
              })
            }
          })
        })
        room.on('participantConnected', (participant) => {
          let remoteVideo = mediaContainer.getElementsByTagName('video')
          let remoteAudio = mediaContainer.getElementsByTagName('audio')
          if (remoteVideo.length > 0) {
            remoteVideo[0].remove()
          }
          if (remoteAudio.length > 0) {
            remoteAudio[0].remove()
          }
          participant.tracks.forEach((publication) => {
            const track = publication.track
            // check if participant accepted video and audio access
            if (publication.isSubscribed) {
              mediaContainer.appendChild(track.attach())
            }
          })
          participant.on('trackSubscribed', (track) => {
            mediaContainer.appendChild(track.attach())
            if (track.kind == 'video') {
              this.loadingPartner = false
              this.callEnded = false
              this.callEnded = false
              this.countdown = 600
              if (!this.isCountdown) {
                this.startCountdown()
                this.isCountdown = true
              }
              ElNotification.success({
                message: 'you are connecting to participant!...'
              })
            }
          })
        })
        room.on('disconnected', (room) => {
          // Detach the local media elements
          this.messages = []
          room.localParticipant.tracks.forEach((publication) => {
            publication.track.stop() // stop all tracks
            const attachedElements = publication.track.detach()
            attachedElements.forEach((element) => element.remove())
          })
          // this.activeRoom = null
        })
        room.on('participantDisconnected', (participant) => {
          // this.activeRoom = null
          this.messages = []
          let remoteVideo = mediaContainer.getElementsByTagName('video')
          let remoteAudio = mediaContainer.getElementsByTagName('audio')
          if (remoteVideo.length > 0) {
            remoteVideo[0].remove()
          }
          if (remoteAudio.length > 0) {
            remoteAudio[0].remove()
          }
          this.elementLoadingText = 'mencari partner...'
          this.loadingPartner = true
        })
      })
    },
    toggleMute() {
      toRaw(this.activeRoom).localParticipant.audioTracks.forEach((track) => {
        if (!this.isAudioMuted) {
          track.track.disable();
          this.isAudioMuted = true
        }
        else {
          track.track.enable();
          this.isAudioMuted = false
        }
      })
    },
    sendMessage() {
      if (useCallegeStore().roomName) {
        let message = { 'sender': useCallegeStore().shortName, 'text': this.newMessage }
        this.messages.push(message)
        this.newMessage = ''
        this.$socket.emit('sendmessage', {
          message: message.text,
          sessionId: useCallegeStore().sessionId,
          room: useCallegeStore().roomName,
          senderName: useCallegeStore().shortName
        })
      }
    },
    startCountdown() {
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
        }
      }, 1000); // Set interval 1 detik (1000 ms)
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
  },
  sockets: {
    joinRoomStatus(msg) {
      this.elementLoadingText = 'Mencari partner...'
      this.loadingPartner = true
    },
    message(msg) {
      if (msg['from'] != useCallegeStore().sessionId) {
        const message = {
          id: Date.now(),
          sender: msg['sendername'],
          text: msg['message']
        }
        this.messages.push(message)
      }
    },
    getNewToken(msg) {
      if (msg['sessionId'] == useCallegeStore().sessionId) {
        this.elementLoadingText = 'Mencari partner...'
        this.loadingPartner = true
        useCallegeStore().roomToken = msg['token']
        useCallegeStore().roomName = msg['room']
        this.$socket.emit('joinRoom', { room_session: useCallegeStore().roomName })
        let remoteVideo = mediaContainer.getElementsByTagName('video')
        let remoteAudio = mediaContainer.getElementsByTagName('audio')
        if (remoteVideo.length > 0) {
          remoteVideo[0].remove()
        }
        if (remoteAudio.length > 0) {
          remoteAudio[0].remove()
        }
        this.startVideoChat()
      }
    }
  }
}
</script>
<style>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>