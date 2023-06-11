<template>
  <div class="bg-[#EBE8FB] pb-24">
    <div>
      <div class="flex mt-10 items-center flex-col"></div>
      <div class="text-lg flex mt-10 justify-center space-x-5">
        <div
          class="block w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 font-family-[roboto] text-lg font-bold tracking-tight text-black dark:text-white"
          >
            Package Premium Callege {{ totalBulan }} Bulan
          </h5>
          <p class="font-normal text-base text-black dark:text-gray-400">
            Berlaku sampai tanggal {{ totalDuration }}
          </p>
          <hr class="mt-5 border-black" />
          <hr />
          <template v-if="!onPaymentStatus">
            <p class="mt-4 font-normal text-base text-black dark:text-gray-400">
              Total harga yang harus dibayar
            </p>
            <p class="mt-2 font-bold text-base text-[#F45050] dark:text-gray-400">
              RP {{ totalPayment.toLocaleString() }}
            </p>
            <p class="text-sm text-gray-600">
                *Total pembayaran diatas adalah estimasi harga yang harus dibayar, harga dapat berubah sesuai dengan harga yang tertera pada payment setelah ini
            </p>
            <hr class="mt-5 border-black" />
            <hr />
            <p class="mt-4 font-bold text-base text-black dark:text-gray-400">Bank</p>
            <ul role="list" class="space-y-5 my-4 ml-3">
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  :class="{ 'bg-gray-200': selected == 'mandiri' }"
                  @click="selectpayment('mandiri')"
                >
                  <img class="w-11" src="../assets/resource/images/payment/mandiri2.png" /><img />
                  <div class="pl-0 text-black text-sm font-normal">Bank Mandiri</div>
                  <Transition name="el-zoom-in-center">
                    <i
                      class="fa-solid fa-circle-check"
                      style="color: green"
                      v-if="selected == 'mandiri'"
                    ></i>
                  </Transition>
                </button>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  @click="selectpayment('bni')"
                  :class="{ 'bg-gray-200': selected == 'bni' }"
                >
                  <img class="w-11" src="../assets/resource/images/payment/bni.svg" /><img />
                  <div class="pl-0 text-black text-sm font-normal">BNI</div>
                  <Transition name="el-zoom-in-center">
                    <i
                      class="fa-solid fa-circle-check"
                      style="color: green"
                      v-if="selected == 'bni'"
                    ></i>
                  </Transition>
                </button>
              </li>
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  @click="selectpayment('bca')"
                  :class="{ 'bg-gray-200': selected == 'bca' }"
                >
                  <img class="w-11" src="../assets/resource/images/payment/bca.svg" /><img />
                  <div class="pl-0 text-black text-sm font-normal">BCA</div>
                  <Transition name="el-zoom-in-center">
                    <i
                      class="fa-solid fa-circle-check"
                      style="color: green"
                      v-if="selected == 'bca'"
                    ></i>
                  </Transition>
                </button>
              </li>
            </ul>
            <p class="mt-4 font-bold text-base text-black dark:text-gray-400">E-Wallet</p>
            <ul role="list" class="space-y-5 my-4 ml-3">
              <li class="flex space-x-3">
                <!-- Icon -->
                <button
                  class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 hover:bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                  @click="selectpayment('qris')"
                  :class="{ 'bg-gray-200': selected == 'qris' }"
                >
                  <img class="w-11" src="../assets/resource/images/payment/qris.svg" /><img />
                  <div class="pl-0 text-black text-sm font-normal">Qris</div>
                  <Transition name="el-zoom-in-center">
                    <i
                      class="fa-solid fa-circle-check"
                      style="color: green"
                      v-if="selected == 'qris'"
                    ></i>
                  </Transition>
                </button>
              </li>
            </ul>
            <button
              class="mt-8 flex justify-center items-center px-3 py-4 text-sm font-medium text-center text-white bg-[#7868E6] rounded-full hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="changePaymentStatus"
            >
              Pilih Metode Pembayaran
            </button>
          </template>
                <Transition name="el-zoom-in-top">
                <div v-if="onPaymentStatus">
                    <div
                class="flex items-center w-full max-w-full p-4 space-x-2 text-gray-500 bg-white hover:bg-gray-100 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                role="alert"
              >
                <img
                  class="w-11"
                  :src="`../src/assets/resource/images/payment/${selectImagePayment}`"
                /><img />
                <div class="pl-0 text-black text-sm font-normal">{{ select }}</div>
              </div>
              <p class="mt-4 font-normal text-base text-black dark:text-gray-400">
                Total harga yang harus dibayar
              </p>
              <p class="mt-2 font-bold text-base text-[#F45050] dark:text-gray-400">RP200.000</p>
              <hr class="mt-5 border-black" />
              <hr />
              <p class="mt-4 font-regular text-base text-black dark:text-gray-400">
                Lakukan pembayaran sebelum
              </p>
              <p class="font-bold text-base text-[#ffb83c] dark:text-gray-400">
                Kamis, 19 Mei 2023 09:00 WIB
              </p>
              <p class="mt-4 font-regular text-base text-black dark:text-gray-400">
                Kode Perusahaan
              </p>
              <p class="mt-4 font-bold font-regular text-base text-black dark:text-gray-400">
                70012
              </p>
              <hr class="mt-3 border-black" />
              <hr />
              <p class="mt-4 font-regular text-base text-black dark:text-gray-400">
                No. Virtual Account
              </p>
              <p class="mt-4 font-bold font-regular text-base text-black dark:text-gray-400">
                6782132212
              </p>
              <hr class="mt-3 border-black" />
              <hr />
              <button
                class="mt-8 flex justify-center items-center px-3 py-4 text-sm font-medium text-center text-white bg-[#7868E6] rounded-full hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Refresh Pembayaran
                </button>
                </div>
            </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
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
    console.log(selected)
    toRaw(selected) = val
    console.log(selected)
}
</script> -->
<script>
import { useCallegeStore } from '../stores/callege'
import { ElMessageBox, ElNotification } from 'element-plus'
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
      totalPay: useCallegeStore().totalSubscribePrice,
      totalBulan: useCallegeStore().subscribeTime,
      totalDuration: useCallegeStore().subscribeDuration,
      select: '',
      selectImage: 'qris.svg',
      onPayment: true
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
    totalPayment(){
        return this.totalPay
    }
  },
  methods: {
    selectpayment(val) {
      this.select = val
      this.selectImage = this.paymentImage[val]
    },
    changePaymentStatus() {
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
        .then(()=>{
            console.log(this.select)
            this.onPayment = !this.onPayment
            ElNotification.success({
                message:'request transaksi berhasil dibuat!, harap selesaikan transaksi yang anda buat.'
            })
        })
    }
  }
}
</script>
