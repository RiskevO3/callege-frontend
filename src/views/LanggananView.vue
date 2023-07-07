<template>
  <section class="bg-[#EBE8FB] dark:bg-[#1b2538] h-full" style="height: 90vh;">
    <div class="flex flex-col items-center justify-center py-2">
      <div class="flex justify-between mx-48 mt-12">
        <div
          class="block w-[650px] p-6 h-[365px] bg-white dark:bg-primaryCardDark border border-gray-300 dark:border-gray-700  rounded-lg shadow-lg">
          <h5 class="mb-2 font-family-[roboto] text-lg font-bold tracking-tight text-black dark:text-white">
            Package Premium Callege {{ subscribeTime }} Bulan
          </h5>
          <p class="font-normal text-black dark:text-gray-400">
            Paket aktif hingga {{ subscribeDuration }}
          </p>
          <p class="mt-4 font-bold text-black dark:text-gray-100">Detail Paket</p>
          <p class="font-normal text-black dark:text-gray-400">Paket sudah termasuk</p>
          <ul role="list" class="space-y-5 my-7 ml-3">
            <li class="flex space-x-3">
              <!-- Icon -->
              <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-[#82CD47] dark:text-blue-500" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Check icon</title>
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="text-base font-normal leading-tight text-black dark:text-gray-400">Fitur chat</span>
            </li>
            <li class="flex space-x-3">
              <!-- Icon -->
              <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-[#82CD47] dark:text-blue-500" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Check icon</title>
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="text-base font-normal leading-tight text-black dark:text-gray-400">Filter pencarian berdasarkan
                jenis kelamin, jurusan, universitas, dan topik</span>
            </li>
            <li class="flex space-x-3">
              <!-- Icon -->
              <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-[#82CD47] dark:text-blue-500" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Check icon</title>
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="text-base font-normal leading-tight text-black dark:text-gray-400">Bebas iklan</span>
            </li>
          </ul>
          <div class="flex items-center justify-between">
            <p class="mt-4 font-bold text-black dark:text-gray-200">Detail Paket</p>
            <p class="mt-4 font-bold text-[#F45050] dark:text-gray-200">
              Rp {{ totalPrice.toLocaleString('id-ID') }}
            </p>
          </div>
        </div>
        <div
          class="w-[400px] p-6 ml-3 bg-white border border-gray-00 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-lg font-bold tracking-tight text-black dark:text-white">
            Detail Pembayaran
          </h5>
          <div class="flex items-center justify-between">
            <p class="font-normal text-black dark:text-gray-400">
              Paket Premium Callege {{ subscribeTime }} Bulan
            </p>
            <p class="font-normal text-black dark:text-gray-400">
              Rp {{ totalPrice.toLocaleString('id-ID') }}
            </p>
          </div>
          <h5 class="mt-4 mb-3 text-base font-bold tracking-tight text-black dark:text-white">
            Kode Promo
          </h5>
          <div class="mt-5 flex items-center justify-between">
            <input v-model="promoCode"
              class="mr-4 bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Masukkan kode promo" required />
            <button type="button"
              class="text-white bg-[#7868E6] hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 inline-flex justify-center w-36 py-4 text-center"
              @click="cekKode">
              Cek Kode
            </button>
          </div>
          <div class="mt-5 flex items-center justify-between">
            <p class="font-normal text-black dark:text-gray-400">Potongan harga</p>
            <p class="font-normal text-black dark:text-gray-400">RP 0</p>
          </div>
          <hr class="mt-5 border-black" />
          <div class="mt-5 flex items-center justify-between">
            <p class="font-bold text-black dark:text-gray-200">TOTAL</p>
            <p class="font-bold text-black dark:text-gray-200">
              RP {{ totalPrice.toLocaleString() }}
            </p>
          </div>
          <button
            class="w-full mt-4 flex justify-center items-center px-3 py-4 text-sm font-medium text-center text-white bg-[#7868E6] rounded-full hover:bg-[#574aab] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="confirmPayment">
            Pilih Metode Pembayaran
          </button>
          <p class="mt-4 text-sm font-normal text-justify text-black dark:text-gray-300">
            Dengan mengklik tombol di atas, kamu menyatakan telah membaca, memahami dan menyetujui
            <a href="#">
              <span class="text-[#574aab] text-sm font-normal"> Kebijakan Pembayaran. </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<!-- <script setup>
import { useCallegeStore } from '../stores/callege';
import {ref,reactive,toRaw} from 'vue'
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import {ElLoading} from 'element-plus'
const router = useRouter()
let subscribeTime = reactive(useCallegeStore().subscribeTime)
let subscribeDuration = reactive(useCallegeStore().totalSubscribePrice)
let totalPrice = reactive(useCallegeStore().totalSubscribePrice)
let promoCode = reactive(null)
let loading = reactive(null)
const cekKode = async () => {
    if(toRaw(promoCode)){
        loading = ElLoading.service({
        fullscreen: true,
        text: 'Memeriksa kode promo...',
        background: 'rgba(0, 0, 0, 0.8)'
    })
        let response = await useCallegeStore().checkPromoCode(promoCode)
        if(response){
            let discount = response['discount']
            ElNotification.success({
            message:'Kode promo benar!'
            })
            loading.close()
        }
        else{
            loading.close()
            ElNotification.error({
            message:'Kode promo salah!'
        })
        }
    }
    else{
        ElNotification.error({
            message:'Harap isi promocode terlebih dahulu!'
        })
    }
}
const confirmPayment = () =>{
    router.push({name:'confirmPayment'})
}
</script> -->
<script>
import { useCallegeStore } from '../stores/callege'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
export default {
  name: 'LanggananView',
  data() {
    return {
      promoCode: null,
      loading: null
    }
  },
  computed: {
    totalPayment() {
      return this.totalPrice
    },
    subscribeTime() {
      return useCallegeStore().subscribeTime
    },
    subscribeDuration() {
      return useCallegeStore().subscribeDuration
    },
    totalPrice() {
      return useCallegeStore().totalSubscribePrice
    }
  },
  methods: {
    async cekKode() {
      if (this.promoCode) {
        this.loading = ElLoading.service({
          fullscreen: true,
          text: 'Memeriksa kode promo...',
          background: 'rgba(0, 0, 0, 0.8)'
        })
        let response = await useCallegeStore().checkPromoCode(this.promoCode)
        if (response) {
          ElNotification.success({
            message: 'Kode promo benar!'
          })
          this.loading.close()
        } else {
          this.loading.close()
          ElNotification.error({
            message: 'Kode promo salah!'
          })
        }
      } else {
        ElNotification.error({
          message: 'Harap isi promocode terlebih dahulu!'
        })
      }
    },
    confirmPayment() {
      useCallegeStore().promoCode = this.promoCode
      this.$router.push({ name: 'confirmpayment' })
    }
  }
}
</script>
