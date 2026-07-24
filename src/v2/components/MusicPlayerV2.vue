<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    youtubeId?: string;
  }>(),
  {
    youtubeId: 'XKNgycbj1qo', // YouTube Video ID (XKNgycbj1qo)
  }
);

const isPlaying = ref(false);
const playerRef = ref<any>(null);
const containerId = 'yt-music-player-' + Math.random().toString(36).substring(2, 7);

const toggleMusic = () => {
  if (!playerRef.value) return;
  if (isPlaying.value) {
    if (typeof playerRef.value.pauseVideo === 'function') {
      playerRef.value.pauseVideo();
    }
    isPlaying.value = false;
  } else {
    if (typeof playerRef.value.playVideo === 'function') {
      playerRef.value.unMute();
      playerRef.value.playVideo();
    }
    isPlaying.value = true;
  }
};

const createPlayer = () => {
  if ((window as any).YT && (window as any).YT.Player) {
    playerRef.value = new (window as any).YT.Player(containerId, {
      height: '1',
      width: '1',
      videoId: props.youtubeId,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: props.youtubeId,
        controls: 0,
        showinfo: 0,
        autohide: 1,
        modestbranding: 1,
      },
      events: {
        onStateChange: (event: any) => {
          // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
          if (event.data === 1) {
            isPlaying.value = true;
          } else if (event.data === 2 || event.data === 0) {
            isPlaying.value = false;
          }
        },
      },
    });
  }
};

const initYouTubeAPI = () => {
  if ((window as any).YT && (window as any).YT.Player) {
    createPlayer();
  } else {
    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
    const prevReady = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      createPlayer();
    };
  }
};

watch(
  () => props.youtubeId,
  (newId) => {
    if (playerRef.value && typeof playerRef.value.loadVideoById === 'function') {
      playerRef.value.loadVideoById(newId);
    }
  }
);

onMounted(() => {
  initYouTubeAPI();
});

onUnmounted(() => {
  if (playerRef.value && typeof playerRef.value.destroy === 'function') {
    playerRef.value.destroy();
  }
});
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40">
    <!-- Invisible YouTube IFrame Container -->
    <div class="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
      <div :id="containerId" />
    </div>

    <!-- Floating Audio Control Pill -->
    <button
      @click="toggleMusic"
      class="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-[#14241B]/95 to-emerald-950/90 border-2 border-amber-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
      :title="isPlaying ? 'Mute Music' : 'Play Music'"
    >
      <!-- Soundwave Animation when playing -->
      <div v-if="isPlaying" class="flex items-end gap-0.5 h-4">
        <span class="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms] h-3" />
        <span class="w-1 bg-amber-300 rounded-full animate-bounce [animation-delay:150ms] h-4" />
        <span class="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms] h-2" />
        <span class="w-1 bg-amber-300 rounded-full animate-bounce [animation-delay:450ms] h-3.5" />
      </div>

      <!-- Music Vector SVG Icon when muted -->
      <div v-else class="text-amber-400">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>

      <span class="font-body text-xs font-semibold text-amber-200 pr-1">
        {{ isPlaying ? 'បទភ្លេង' : 'បើកភ្លេង' }}
      </span>
    </button>
  </div>
</template>
