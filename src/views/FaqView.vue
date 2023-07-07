<template>
    <div class="container mx-auto bg-white dark:bg-gray-800 rounded-xl p-10">
        <div class="flex flex-col pb-[30px] justify-center items-center">
            <h1 class="font-bold text-4xl pb-[30px]">Ada yang bisa kami bantu?</h1>
            <h2 class="font-bold text-xl">Pertanyaan Paling Sering</h2>
        </div>
        <div class="flex flex-col pt-[50px]">
            <button class="dropdown-trigger relative font-semibold flex items-center">
                <span class="pr-4"><i class="fa-solid fa-circle" style="color: gray;"></i></span>
                Bagaimana cara menggunakan Callege?
                <span
                    class="dropdown-icon absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform duration-300">
                    <i class="fa-solid fa-square-caret-right" style="color:gray;"></i>
                </span>
            </button>
            <div class="dropdown-content hidden pt-[15px]">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil natus maiores porro iste corporis sint
                    explicabo rerum quam eos vel, quas similique culpa nostrum ea quos dolore ipsa! Recusandae, libero!</p>
            </div>

            <hr class="my-[15px]">

            <button class="dropdown-trigger relative font-semibold flex items-center">
                <span class="pr-4"><i class="fa-solid fa-circle" style="color: gray;"></i></span>
                Bagaimana cara bisa berlangganan?
                <span
                    class="dropdown-icon absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform duration-300">
                    <i class="fa-solid fa-square-caret-right" style="color:gray;"></i>
                </span>
            </button>
            <div class="dropdown-content hidden pt-[15px] transition-transform duration-300">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil natus maiores porro iste corporis sint
                    explicabo rerum quam eos vel, quas similique culpa nostrum ea quos dolore ipsa! Recusandae, libero!</p>
            </div>

            <hr class="my-[15px]">

            <button class="dropdown-trigger relative flex font-semibold items-center">
                <span class="pr-4"><i class="fa-solid fa-circle" style="color: gray;"></i></span>
                Apa keuntungan berlangganan Callage?
                <span
                    class="dropdown-icon absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform duration-300">
                    <i class="fa-solid fa-square-caret-right" style="color:gray;"></i>
                </span>
            </button>
            <div class="dropdown-content hidden pt-[15px]">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil natus maiores porro iste corporis sint
                    explicabo rerum quam eos vel, quas similique culpa nostrum ea quos dolore ipsa! Recusandae, libero!</p>
            </div>

            <hr class="my-[15px]">

            <button class="dropdown-trigger relative flex font-semibold items-center">
                <span class="pr-4"><i class="fa-solid fa-circle" style="color: gray;"></i></span>
                Metode pembayaran bisa apa saja?
                <span
                    class="dropdown-icon absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform duration-300">
                    <i class="fa-solid fa-square-caret-right" style="color:gray;"></i>
                </span>
            </button>
            <div class="dropdown-content hidden pt-[15px]">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil natus maiores porro iste corporis sint
                    explicabo rerum quam eos vel, quas similique culpa nostrum ea quos dolore ipsa! Recusandae, libero!</p>
            </div>
            <hr class="my-[15px]">
        </div>
        <div class="pt-[60px]">
            <div class="flex flex-col pb-[30px] justify-center items-center">
                <h1 class="font-bold text-xl pb-[15px]">Ada yang bisa kami bantu?</h1>
                <p>Jika kamu masih belum memiliki jawaban dari FAQ kami, kamu bisa menghubungi kami. Kami akan menjawab
                    secepatnya!</p>
            </div>
            <div class="flex flex-wrap justify-center items-center pb-8">
                <button
                    class="flex flex-col justify-center items-center mr-4 rounded-xl dark:text-gray-800 py-2 px-4 bg-white max-w-[400px] w-full border-2 border-[#D5D0F7] shadow transition hover:scale-105">
                    <span>
                        <i class="fa-solid fa-phone-volume"></i>
                    </span>
                    <p class="py-[15px]">+62 833 4668 8390</p>
                    <p class="text-sm">Hanya chat</p>
                </button>
                <button
                    class="flex flex-col justify-center items-center mr-4 rounded-xl py-2 px-4 max-w-[400px] w-full bg-[#D5D0F7] shadow transition hover:scale-105">
                    <span>
                        <i class="fa-solid fa-envelope" style="color:#7868E6;"></i>
                    </span>
                    <p class="py-[15px] text-[#7868E6]">support@callege.com</p>
                    <p class="text-sm text-[#52616B]">Cara terbaik untuk dijawab lebih cepat</p>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FaqView',
    mounted() {
        this.dropdown();
    },
    methods: {
        dropdown() {
            const dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
            dropdownTrigger.forEach((trigger) => {
                const dropdownContent = trigger.nextElementSibling;
                const dropdownIcon = trigger.querySelector(".dropdown-icon");
                trigger.addEventListener('click', () => {
                    dropdownContent.classList.toggle("hidden");
                    dropdownIcon.classList.toggle("rotate-90");
                });
            });
        }
    },
}
</script>