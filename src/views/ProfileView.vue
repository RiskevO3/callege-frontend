<template>
        <div class="container mx-auto bg-white rounded-xl p-10">
            <div class="w-full  bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-1">
                    <h5 class="text-3xl font-bold leading-none text-gray-900 dark:text-white">Profil Saya</h5>
                </div>
                <div class="p-5">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <img class="w-[5rem] aspect-square rounded-full" :src="useCallegeStore().picture" alt="User Avatar">
                        </div>
                        <div class="flex-1 ps-5 space-y-1 min-w-0  h-full">
                            <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
                                {{ useCallegeStore().name  }}
                            </p>
                            <p class="text-md text-gray-500 truncate dark:text-gray-400 font-semibold">
                                Free User
                            </p>
                        </div>
                        <div class="items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button 
                                class="transition-all text-white bg-[#F45050] hover:bg-[#DC4848] focus:ring-4 focus:ring-[#FCC9C9] leading-none font-medium rounded-lg text-md px-12 pt-3 pb-3.5 mr-2 mb-2 "
                                @click="openSubscribe"
                                >
                                Langganan
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-8">
                    <div>
                        <div class="grid gap-y-8 gap-x-10 mb-6 md:grid-cols-2">
                            <div>
                                <label for="nama_panggilan"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Nama
                                    Panggilan</label>
                                <input type="text" id="nama_panggilan" name="nama_panggilan"
                                    class="bg-white border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. Wage" v-model="nama_panggilan" required>
                            </div>
                            <div>
                                <label for="nama_lengkap"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Nama
                                    Lengkap</label>
                                <input type="text" id="nama_lengkap" name="nama_lengkap"
                                    class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. James Wage Hamilton" :value="useCallegeStore().name" disabled>
                            </div>
                            <div>
                                <label for="email"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Alamat
                                    Email</label>
                                <input type="email" id="email" name="email"
                                    class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. jameswage@student.telkomuniversity.ac.id" :value="useCallegeStore().email"
                                    readonly>
                            </div>

                            <div>
                                <label for="phone"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Nomor
                                    Telepon</label>
                                <input type="number" id="phone" name="phone" pattern="[0-9]*" inputmode="numeric"
                                    class="bg-white border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. 0822 4690 5357" v-model.number="phone" required>

                            </div>
                            <div>
                                <label for="universitas"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Universitas</label>
                                <input type="text" id="universitas" name="universitas"
                                    class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. Universitas Telkom" :value="useCallegeStore().universitas" disabled>
                            </div>
                            <div>
                                <label for="jurusan"
                                    class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Jurusan</label>
                                <input type="text" id="jurusan" name="jurusan"
                                    class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                    placeholder="ex. S1 Informatika" :value="useCallegeStore().jurusan" disabled>
                            </div>
                        </div>
                        <div class="flex justify-center mt-12">
                            <button
                                type="button"
                                class="transition-all text-white bg-[#7868E6] hover:bg-[#6C5ECF] focus:ring-4 focus:outline-none focus:ring-[#D5D0F7] font-medium rounded-xl text-lg w-full sm:w-auto px-8 py-3 text-center disabled:opacity-75"
                                @click="updateProfile"
                                :disabled="!phone"
                                >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { useCallegeStore } from '../stores/callege';
import { ElMessageBox,ElNotification,ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
let nama_panggilan = useCallegeStore().shortName
let phone = ref(useCallegeStore().phone)
function hitungTanggal(tambahanBulan) {
  var tanggal = new Date(); // Mendapatkan tanggal hari ini
  tanggal.setMonth(tanggal.getMonth() + tambahanBulan); // Menambahkan bulan ke tanggal
  
  // Membuat objek untuk nama bulan dalam Bahasa Indonesia
  var namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  
  // Mendapatkan informasi tanggal, bulan, dan tahun
  var tanggalHasil = tanggal.getDate();
  var bulanHasil = namaBulan[tanggal.getMonth()];
  var tahunHasil = tanggal.getFullYear();
  // Menghasilkan output dalam format yang diinginkan
  var output = tanggalHasil + " " + bulanHasil + " " + tahunHasil;
  
  return output;
}
const updateProfile = () => {
            if(nama_panggilan.length > 0 && phone){
                ElMessageBox.confirm(
                'Anda akan merubah informasi akun, lanjutkan?',
                'Warning',
                {
                    confirmButtonText: 'Lanjutkan',
                    cancelButtonText: 'Batalkan',
                    type: 'warning',
                    center: true,
                }
            )
            .then(async ()=>{
                useCallegeStore().shortName = nama_panggilan
                useCallegeStore().phone = phone
                let res = await useCallegeStore().updateUser();
                if(res){
                    router.push({name:'streaming'})
                    ElNotification({
                        title:'Berhasil!',
                        message:'Berhasil mengubah profile',
                        type:'success'
                    })
                }
                else{

                    ElNotification({
                        title:'Gagal!',
                        message:'Gagal mengubah profile',
                        type:'error'
                    })
                }
            })
            .catch((err)=>{
                // console.log(err)
                ElNotification({
                    title:'Info',
                    message:'Perubahan dibatalkan',
                    type:'info'
                })
            })
            }
            else{
                ElNotification({
                    title:'Info',
                    message:'Harap isi seluruh data yang diperlukan',
                    type:'info'
                })
            }
}
const openSubscribe = () => {
    ElNotification.info({
        message:'Fitur Premium Akan Segera Hadir!'
    }
    )
//   if(useCallegeStore().isVerif){
//     ElMessageBox.prompt('Masukkan total bulan yang anda inginkan', 'Konfirmasi Langganan', {
//     confirmButtonText: 'OK',
//     cancelButtonText: 'Cancel',
//     inputType:'number',
//     placeholder:'0',
//     inputValidator: (val) => {
//         if(val > 0){
//             return true
//         }
//         else{
//             return 'Harap masukkan jumlah bulan langganan lebih dari 0'
//         }
//     }
//   })
//     .then(({ value }) => {
//       let totalBulan = parseInt(value)
//       let totalDuration = hitungTanggal(totalBulan)
//       if(parseInt(totalBulan) > 0){
//         ElMessage.success({
//         message: `anda akan mensubscribe sampai ${totalDuration}`,
//       })
//       useCallegeStore().subscribeTime = totalBulan
//       useCallegeStore().subscribeDuration = totalDuration
//       useCallegeStore().totalSubscribePrice = totalBulan * 200000
//       router.push({name:'subscribe'})
//       }
//       else{
//         ElMessage.error({
//         message: 'tidak bisa mensubscribe kurang dari 1 bulan',
//       })
//       }
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: 'Input canceled',
//       })
//     })
//   }
//   else{
//     ElNotification.error({
//         message:'Harap isi nomor telfon dan nama panggilan terlebih dahulu!.'
//     })
//   }
}
</script>
<!-- <script>
import { useCallegeStore } from '../stores/callege';
import { ElMessageBox, ElNotification } from 'element-plus';
import { RouterLink } from 'vue-router';
export default{
    name:'ProfileView',
    setup(){
        return {useCallegeStore}
    },
    data(){
        return{
            nama_panggilan:useCallegeStore().shortName,
            phone:useCallegeStore().phone,
            
        }
    },
    components:{
        RouterLink
    },
    methods:{
        updateProfile(){
            if(this.nama_panggilan.length > 0 && this.phone){
                ElMessageBox.confirm(
                'Anda akan merubah informasi akun, lanjutkan?',
                'Warning',
                {
                    confirmButtonText: 'Lanjutkan',
                    cancelButtonText: 'Batalkan',
                    type: 'warning',
                    center: true,
                }
            )
            .then(async ()=>{
                useCallegeStore().shortName = this.nama_panggilan
                useCallegeStore().phone = this.phone
                let res = await useCallegeStore().updateUser();
                if(res){
                    this.$router.push({name:'streaming'})
                    ElNotification({
                        title:'Berhasil!',
                        message:'Berhasil mengubah profile',
                        type:'success'
                    })
                }
                else{

                    ElNotification({
                        title:'Gagal!',
                        message:'Gagal mengubah profile',
                        type:'error'
                    })
                }
            })
            .catch(()=>{
                ElNotification({
                    title:'Info',
                    message:'Perubahan dibatalkan',
                    type:'info'
                })
            })
            }
            else{
                ElNotification({
                    title:'Info',
                    message:'Harap isi seluruh data yang diperlukan',
                    type:'info'
                })
            }
        }
    }
}
</script> -->