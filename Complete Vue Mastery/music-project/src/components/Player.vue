<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16"
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button" @click.prevent="store.toggleAudio">
          <i
            class="fa text-gray-500 text-xl"
            :class="{ 'fa-play': !store.playing, 'fa-pause': store.playing }"
          ></i>
        </button>
      </div>
      <!-- Current Position -->
      <div
        class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mt-1"
      >
        <span class="player-currenttime">{{ store.seek }}</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div
          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"
          v-if="store.currentSong.modifiedName"
        >
          <span class="song-title">{{ store.currentSong.modifiedName }}</span>
          by
          <span class="song-artist">{{ store.currentSong.displayName }}</span>
        </div>
        <!-- Scrub Container  -->
        <span
          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"
          @click.prevent="store.updateSeek"
        >
          <!-- Player Ball -->
          <span
            class="absolute top-neg-8 text-gray-800 text-lg"
            :style="{ left: store.playerProgress }"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            :style="{ width: store.playerProgress }"
          ></span>
        </span>
      </div>
      <!-- Duration -->
      <div
        class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">{{ store.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from "@/stores/main";
export default {
  name: "Player",
  setup() {
    const store = useMainStore();
    return {
      store,
    };
  },
};
</script>
