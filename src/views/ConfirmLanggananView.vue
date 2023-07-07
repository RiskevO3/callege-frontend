<template>
  <section class="bg-[#EBE8FB] dark:bg-[#1b2538] h-full">
    <div class="flex flex-col items-center justify-center py-2">
      <div class="text-lg flex my-10 justify-center space-x-5">
        <div
          class="block w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 font-family-[roboto] text-lg font-bold tracking-tight text-black dark:text-white">
            Package Premium Callege {{ totalBulan }} Bulan
          </h5>
          <p class="font-normal text-base text-black dark:text-gray-400">
            Berlaku sampai tanggal {{ totalDuration }}
          </p>
          <hr class="mt-5 border-black" />
          <hr />
          <template v-if="!onPaymentStatus">
            <p class="mt-4 font-normal text-base text-black dark:text-gray-200">
              Total harga yang harus dibayar
            </p>
            <p class="mt-2 font-bold text-base text-[#F45050] dark:text-gray-200">
              RP {{ totalPayment.toLocaleString('id-ID') }}
            </p>
            <p class="text-sm text-justify text-gray-400">
              *Total pembayaran diatas adalah estimasi harga yang harus dibayar, harga dapat berubah sesuai dengan harga
              yang tertera pada payment setelah ini
            </p>
            <hr class="mt-5 border-black" />
            <hr />
            <p class="mt-4 font-bold text-base text-black dark:text-white">Bank</p>
            <ul role="list" class="space-y-5 my-4 ml-3">
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-200 dark:divide-gray-700 space-x dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  :class="{ 'bg-gray-200': selected == 'mandiri' }" @click="selectpayment('mandiri')">
                  <img class="w-11" src="../assets/resource/images/payment/mandiri2.png" /><img />
                  <div class="pl-0 text-sm font-normal">Bank Mandiri</div>
                  <Transition name="el-zoom-in-center">
                    <i class="fa-solid fa-circle-check" style="color: green" v-if="selected == 'mandiri'"></i>
                  </Transition>
                </button>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-200 dark:divide-gray-700 space-x dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  @click="selectpayment('bni')" :class="{ 'bg-gray-200': selected == 'bni' }">
                  <img class="w-11" src="../assets/resource/images/payment/bni.svg" /><img />
                  <div class="pl-0 text-sm font-normal">BNI</div>
                  <Transition name="el-zoom-in-center">
                    <i class="fa-solid fa-circle-check" style="color: green" v-if="selected == 'bni'"></i>
                  </Transition>
                </button>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-200 dark:divide-gray-700 space-x dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  @click="selectpayment('bca')" :class="{ 'bg-gray-200': selected == 'bca' }">
                  <img class="w-11" src="../assets/resource/images/payment/bca.svg" /><img />
                  <div class="pl-0 text-sm font-normal">BCA</div>
                  <Transition name="el-zoom-in-center">
                    <i class="fa-solid fa-circle-check" style="color: green" v-if="selected == 'bca'"></i>
                  </Transition>
                </button>
              </li>
            </ul>
            <p class="mt-4 font-bold text-base text-black dark:text-gray-400">E-Wallet</p>
            <ul role="list" class="space-y-5 my-4 ml-3">
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-200 dark:divide-gray-700 space-x dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  @click="selectpayment('qris')" :class="{ 'bg-gray-200': selected == 'qris' }">
                  <img class="w-11" src="../assets/resource/images/payment/qris.svg" /><img />
                  <div class="pl-0 text-sm font-normal">Qris</div>
                  <Transition name="el-zoom-in-center">
                    <i class="fa-solid fa-circle-check" style="color:green" v-if="selected == 'qris'"></i>
                  </Transition>
                </button>
              </li>
            </ul>
            <button
              class="mt-8 w-full flex justify-center items-center mx-auto px-3 py-4 text-sm font-medium text-center text-white bg-[#7868E6] rounded-full hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="choosePayment">
              Pilih Metode Pembayaran
            </button>
          </template>
          <Transition name="el-zoom-in-top">
            <div v-if="onPaymentStatus">
              <div
                class="flex items-center w-full max-w-full p-4 my-4 space-x-2 text-gray-500 bg-white dark:bg-primaryCardDark border border-gray-300 dark:border-gray-700 dark:text-gray-200  rounded-lg shadow-lg"
                role="alert">
                <img class="w-11" :src="`../src/assets/resource/images/payment/${selectImagePayment}`" /><img />
                <div class="pl-0 text-sm font-normal capitalize">{{ select }}</div>
              </div>
              <p class="mt-4 font-normal text-base text-black dark:text-gray-200">
                Total harga yang harus dibayar
              </p>
              <p class="mt-2 font-bold text-base text-[#F45050] dark:text-gray-300">Rp. {{
                totalPay.toLocaleString('id-ID')
              }}</p>
              <hr class="mt-5 border-black" />
              <hr />
              <p class="mt-4 font-regular text-base text-black dark:text-gray-200">
                Sisa Waktu Pembayaran:
              </p>
              <p class="text-center font-bold text-[#ffb83c] bg-red-500 rounded dark:text-white">
                {{ formattedCountdown }}
              </p>
              <template v-if="!(selected == 'qris')">
                <p class="mt-4 font-regular text-base text-black dark:text-gray-200">
                  No. Virtual Account
                </p>
                <p class="mt-4 font-bold font-regular text-base text-black dark:text-gray-300">
                  {{ paymentNumber }}
                  <i class="fa-solid fa-copy hover:text-[#7668e3] pr-0" @click="copyToClipboard(paymentNumber)">
                  </i>
                </p>
              </template>
              <template v-else>
                <div class="my-2 font-bold text-center text-white content-center">
                  <p class="mb-2 font-regular text-base text-black dark:text-gray-200">
                    Harap Scan QRIS dibawah ini untuk melakukan pembayaran
                  </p>
                  <figure class="w-full">
                    <vue-qrcode :value="paymentNumber" :options="{ width: 450 }"></vue-qrcode>
                  </figure>
                </div>
              </template>
              <hr class="mt-3 border-black" />
              <hr />
              <button
                class="mt-8 mx-auto w-full flex justify-center items-center px-3 py-4 text-sm font-medium text-center text-white bg-[#7868E6] rounded-full hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="refreshPayment">
                Refresh Pembayaran
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useCallegeStore } from '../stores/callege'
import { ElLoading, ElMessageBox, ElNotification } from 'element-plus'
export default {
  name: 'ConfirmLanggananView',
  data() {
    return {
      paymentImage: {
        qris: 'qris.svg',
        mandiri: 'mandiri2.png',
        bni: 'bni.svg',
        bca: 'bca.svg'
      },
      countdown: 86400,
      totalPay: useCallegeStore().totalSubscribePrice,
      totalBulan: useCallegeStore().subscribeTime,
      totalDuration: useCallegeStore().subscribeDuration,
      select: 'mandiri',
      selectImage: 'mandiri2.png',
      paymentNo: null,
      onPayment: false,
      loading: null,
      transactionId: null
    }
  },
  computed: {
    selected() {
      return this.select
    },
    selectImagePayment() {
      return this.selectImage
    },
    onPaymentStatus() {
      return this.onPayment
    },
    totalPayment() {
      return this.totalPay
    },
    paymentNumber() {
      return this.paymentNo
    },
    formattedCountdown() {
      const hours = Math.floor(this.countdown / 3600);
      const minutes = Math.floor((this.countdown % 3600) / 60);
      const seconds = this.countdown % 60;
      return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }
  },
  methods: {
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
    selectpayment(val) {
      this.select = val
      this.selectImage = this.paymentImage[val]
    },
    choosePayment() {
      ElMessageBox.confirm(
        `Anda memilih channel pembayaran ${this.select}, lanjutkan?`,
        'Warning',
        {
          confirmButtonText: 'Lanjutkan',
          cancelButtonText: 'Batalkan',
          type: 'warning',
          center: true,
        }
      )
        .then(async () => {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          useCallegeStore().paymentChannel = this.select
          let res = await useCallegeStore().makeTransaction()
          if (res) {
            this.totalPay = res.totalAmount
            this.paymentNo = res.paymentNo
            this.transactionId = res.transactionId
            this.onPayment = true
            this.$socket.emit('joinRoom', { 'room_session': this.transactionId })
            this.startCountdown()
            this.loading.close()
            ElNotification.success({
              message: 'Request pembayaran berhasil dibuat, harap lakukan pembayaran sebelum waktu habis.'
            })
          }
          else {
            this.loading.close()
            ElNotification.error({
              message: 'Terjadi kesalahan, silahkan coba lagi'
            })
          }
        })
    },
    async refreshPayment() {
      this.loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let res = await useCallegeStore().refreshPaymentStatus(this.transactionId)
      if (res) {
        ElNotification.success({
          message: 'sukses!,pembayaran anda telah berhasil dilakukan!'
        })
        await useCallegeStore().authUser()
        this.$router.push({ name: 'profile' })
        this.loading.close()
      } else {
        ElNotification.error({
          message: 'Pembayaran anda belum sukses, silahkan coba lagi!'
        })
        this.loading.close()
      }
    },
    copyToClipboard(val) {
      navigator.clipboard.writeText(val)
      ElNotification.success({
        message: 'No. Virtual Account berhasil dicopy!'
      })
    }
  },
  sockets: {
    async paymentStatus(msg) {
      if (msg['status'] == 'success') {
        await useCallegeStore().authUser()
        this.$router.push({ name: 'profile' })
        ElNotification.success({
          message: 'Pembayaran berhasil dilakukan, terimakasih banyak!'
        })
      }
    }
  }
}
</script>
<!-- <script setup>
import { ref,computed,toRaw } from 'vue';
import { RouterLink } from 'vue-router';
import { useCallegeStore } from '../stores/callege';
let totalPayment = ref(useCallegeStore().totalSubscribePrice)
let totalBulan = ref(useCallegeStore().subscribeTime)
let totalDuration = ref(useCallegeStore().subscribeDuration)
let selected = ref('bni')
let select = computed(selected)
const selectpayment = (val) =>{
    toRaw(selected) = val
}
</script> -->