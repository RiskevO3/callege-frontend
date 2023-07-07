<template>
    <div class="container mx-auto bg-white dark:bg-gray-800 rounded-xl p-10">
        <div class="w-full  bg-white dark:bg-gray-800 rounded-lg  dark:border-gray-700">
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
                            {{ useCallegeStore().name }}
                        </p>
                        <p class="text-md text-gray-500 truncate dark:text-gray-400 font-bold">
                            {{ premiumStatus ? 'Premium User' : 'Free User' }}
                        </p>
                        <p class="text-sm text-gray-500 truncate font-semibold" v-if="premiumStatus">
                            Valid Untill : {{ premiumStatus ? premiumStatus : 'Tidak Aktif' }}
                        </p>
                    </div>
                    <div class="items-center text-base font-semibold text-gray-900 dark:text-white">
                        <button
                            class="transition-all border-2 border-purple-500 dark:border-[#BF125D] bg-white dark:bg-[#751A3D] text-purple-500 dark:text-white text-lg hover:bg-primary hover:text-white focus:ring-4 focus:ring-[#FCC9C9] leading-none font-medium rounded-lg text-md px-12 pt-3 pb-3.5 mr-2 mb-2  hover:scale-105 active:scale-90"
                            @click="openSubscribe">
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
                                class="bg-white border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                placeholder="" v-model="nama_panggilan" required>
                        </div>
                        <div>
                            <label for="gender" class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Jenis
                                Kelamin</label>
                            <select id="gender" name="gender" v-model="gender"
                                class="bg-white border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]">
                                <option value="Laki-Laki" :selected="gender === 'Laki-Laki'">Laki-Laki</option>
                                <option value="Perempuan" :selected="gender === 'Perempuan'">Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label for="email" class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Alamat
                                Email</label>
                            <input type="email" id="email" name="email"
                                class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                placeholder="ex. jameswage@student.telkomuniversity.ac.id" :value="useCallegeStore().email"
                                readonly>
                        </div>

                        <div>
                            <label for="phone" class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Nomor
                                Telepon</label>
                            <input type="number" id="phone" name="phone" pattern="[0-9]*" inputmode="numeric"
                                class="bg-white border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                placeholder="ex. 0822 4690 5357" v-model.number="phone" required>

                        </div>
                        <div>
                            <label for="universitas"
                                class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Universitas</label>
                            <input type="text" id="universitas" name="universitas"
                                class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                :value="useCallegeStore().universitas" disabled>
                        </div>
                        <div>
                            <label for="jurusan"
                                class="block mb-4 text-md font-medium text-gray-900 dark:text-white">Jurusan</label>
                            <input type="text" id="jurusan" name="jurusan"
                                class="bg-[#EEEFF0] border border-gray-300 text-gray-900 text-md ps-4 py-3 rounded-lg focus:ring-[#D5D0F7] focus:border-[#D5D0F7] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D5D0F7] dark:focus:border-[#D5D0F7]"
                                :value="useCallegeStore().jurusan" disabled>
                        </div>
                    </div>
                    <div class="flex justify-center mt-12">
                        <button type="button"
                            class="transition-all border-2 border-purple-500 dark:border-[#5145CD] bg-purple-500 dark:bg-[#362F78] text-white focus:ring-4 focus:outline-none focus:ring-[#D5D0F7] font-medium rounded-xl text-lg w-full sm:w-auto px-8 py-3 text-center disabled:opacity-75 hover:scale-105 active:scale-90"
                            @click="updateProfile" :disabled="!phone || !gender">
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
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
let nama_panggilan = useCallegeStore().shortName
let phone = ref(useCallegeStore().phone)
let gender = useCallegeStore().gender
let premiumStatus = useCallegeStore().isPremium ? hitungTanggal(0, useCallegeStore().isPremium) : null
function hitungTanggal(tambahanBulan, awaltanggal = null) {
    let tanggal;
    if (!awaltanggal) {
        tanggal = new Date(); // Mendapatkan tanggal hari ini
    }
    else {
        tanggal = new Date(awaltanggal)
    }
    tanggal.setMonth(tanggal.getMonth() + tambahanBulan); // Menambahkan bulan ke tanggal

    // Membuat objek untuk nama bulan dalam Bahasa Indonesia
    let namaBulan = [
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
    let tanggalHasil = tanggal.getDate();
    let bulanHasil = namaBulan[tanggal.getMonth()];
    let tahunHasil = tanggal.getFullYear();
    // Menghasilkan output dalam format yang diinginkan
    let output = tanggalHasil + " " + bulanHasil + " " + tahunHasil;

    return output;
}
const updateProfile = () => {
    if (nama_panggilan.length > 0 && phone && gender.length > 0) {
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
            .then(async () => {
                useCallegeStore().shortName = nama_panggilan
                useCallegeStore().phone = phone
                useCallegeStore().gender = gender
                let res = await useCallegeStore().updateUser();
                if (res) {
                    router.push({ name: 'streaming' })
                    ElNotification({
                        title: 'Berhasil!',
                        message: 'Berhasil mengubah profile',
                        type: 'success'
                    })
                }
                else {

                    ElNotification({
                        title: 'Gagal!',
                        message: 'Gagal mengubah profile',
                        type: 'error'
                    })
                }
            })
            .catch((err) => {
                ElNotification({
                    title: 'Info',
                    message: 'Perubahan dibatalkan',
                    type: 'info'
                })
            })
    }
    else {
        ElNotification({
            title: 'Info',
            message: 'Harap isi seluruh data yang diperlukan',
            type: 'info'
        })
    }
}
const openSubscribe = () => {
    if (useCallegeStore().isVerif) {
        ElMessageBox.prompt('Masukkan total bulan yang anda inginkan', 'Konfirmasi Langganan', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputType: 'number',
            placeholder: '0',
            inputValidator: (val) => {
                if (val > 0) {
                    return true
                }
                else {
                    return 'Harap masukkan jumlah bulan langganan lebih dari 0'
                }
            }
        })
            .then(({ value }) => {
                let totalBulan = parseInt(value)
                let totalDuration = premiumStatus ? hitungTanggal(totalBulan, useCallegeStore().isPremium) : hitungTanggal(totalBulan)
                if (parseInt(totalBulan) > 0) {
                    ElMessage.success({
                        message: `anda akan mensubscribe sampai ${totalDuration}`,
                    })
                    useCallegeStore().subscribeTime = totalBulan
                    useCallegeStore().subscribeDuration = totalDuration
                    useCallegeStore().totalSubscribePrice = totalBulan * 200000
                    router.push({ name: 'subscribe' })
                }
                else {
                    ElMessage.error({
                        message: 'tidak bisa mensubscribe kurang dari 1 bulan',
                    })
                }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Input canceled',
                })
            })
    }
    else {
        ElNotification.error({
            message: 'Harap isi nomor telfon dan nama panggilan terlebih dahulu!.'
        })
    }
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