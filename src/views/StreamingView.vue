<template>
    <div class="container mx-auto rounded-xl p-10" style="background-color: #eae8fa;">
        <div class="flex p-4">
            <div class="w-1/2 pr-4">
                <!-- First Video Content -->
                <div class="bg-gray-200 h-[500px] w-full rounded-3xl">
                    <div class="video-container">
                        <video id="videoElement" class="h-full w-full" autoplay></video>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <!-- Second Video Content -->
                <div class="bg-gray-200 h-[500px] rounded-3xl"></div>
            </div>
        </div>
        <div class="p-[10px] mx-auto bg-white rounded-lg">
            <ul class="flex justify-center gap-4">
                <li>
                    <a href="#" class="text-lg border-2 border-purple-500 bg-purple-500 text-white text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
                    <i class="fas fa-play"></i>
                    Mulai
                    </a>
                </li>
                <li>
                    <a href="#" class="text-lg border-2 border-purple-500 bg-white text-purple-500  text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
                    <i class="fa-solid fa-stop"></i>
                    Stop
                    </a>
                </li>
                <li>
                    <a href="#" class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
                        <i class="fa-solid fa-microphone"></i>
                        Mute
                    </a>
                </li>
                <li>
                    <a href="#" class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        Report User
                    </a>
                </li>
                <li>
                    <a href="#" class="text-lg border-2 border-purple-500 bg-white text-purple-500 text-lg px-4 py-2 flex items-center gap-2 rounded-2xl hover:scale-105 active:scale-90">
                        <i class="fa-solid fa-filter"></i>
                        Options
                    </a>
                </li>
            </ul>
        </div>
        <div class="p-4 mx-auto mt-4 bg-white rounded-lg" id="chatBox" style="display: block;">
            <!-- Chat Box -->
            <div class="h-[200px] bg-gray-200 rounded-lg">
                <div class="h-full flex flex-col justify-end">
                    <!-- Chat messages -->
                    <div class="overflow-y-auto">
                        <!-- Your chat messages go here -->
                    </div>
                    <!-- Input field -->
                    <div class="mt-2">
                        <input type="text" placeholder="Type your message..."
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>