<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    youtubeId?: string;
    theme?: 'v1' | 'v2';
  }>(),
  {
    youtubeId: 'XKNgycbj1qo', // YouTube Video ID
    theme: 'v1',
  },
);

const isPlaying = ref(false);
const playerRef = ref<any>(null);
const userHasInteracted = ref(false);
const startTimeSeconds = 14; // Start music from 0:14
const containerId =
  'yt-music-player-' + Math.random().toString(36).substring(2, 7);

const tryPlay = () => {
  if (!playerRef.value) return;
  try {
    if (typeof playerRef.value.unMute === 'function') {
      playerRef.value.unMute();
    }
    if (
      typeof playerRef.value.seekTo === 'function' &&
      typeof playerRef.value.getCurrentTime === 'function'
    ) {
      const curTime = playerRef.value.getCurrentTime();
      if (curTime < startTimeSeconds) {
        playerRef.value.seekTo(startTimeSeconds, true);
      }
    }
    if (typeof playerRef.value.playVideo === 'function') {
      playerRef.value.playVideo();
    }
  } catch (e) {
    // Autoplay blocked by browser policy until user interaction
  }
};

const playMusic = () => {
  userHasInteracted.value = true;
  tryPlay();
};

defineExpose({
  playMusic,
});

const toggleMusic = () => {
  userHasInteracted.value = true;
  if (!playerRef.value) return;
  if (isPlaying.value) {
    if (typeof playerRef.value.pauseVideo === 'function') {
      playerRef.value.pauseVideo();
    }
    isPlaying.value = false;
  } else {
    tryPlay();
  }
};

const handleUserInteraction = () => {
  userHasInteracted.value = true;
  if (playerRef.value) {
    tryPlay();
  }
};

const removeInteractionListeners = () => {
  window.removeEventListener('pointerdown', handleUserInteraction);
  window.removeEventListener('click', handleUserInteraction);
  window.removeEventListener('touchstart', handleUserInteraction);
  window.removeEventListener('scroll', handleUserInteraction);
  window.removeEventListener('keydown', handleUserInteraction);
};

const createPlayer = () => {
  if ((window as any).YT && (window as any).YT.Player) {
    playerRef.value = new (window as any).YT.Player(containerId, {
      height: '1',
      width: '1',
      videoId: props.youtubeId,
      playerVars: {
        autoplay: 1,
        start: startTimeSeconds, // Start playback at 14 seconds (0:14)
        loop: 1,
        playlist: props.youtubeId,
        controls: 0,
        showinfo: 0,
        autohide: 1,
        modestbranding: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: (event: any) => {
          try {
            event.target.unMute();
            if (typeof event.target.seekTo === 'function') {
              event.target.seekTo(startTimeSeconds, true);
            }
            event.target.playVideo();
          } catch (e) {
            // Autoplay waiting for interaction
          }
          if (userHasInteracted.value) {
            tryPlay();
          }
        },
        onStateChange: (event: any) => {
          // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
          if (event.data === 1) {
            isPlaying.value = true;
            removeInteractionListeners();
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
    if (
      playerRef.value &&
      typeof playerRef.value.loadVideoById === 'function'
    ) {
      playerRef.value.loadVideoById({
        videoId: newId,
        startSeconds: startTimeSeconds,
      });
    }
  },
);

onMounted(() => {
  initYouTubeAPI();
  window.addEventListener('pointerdown', handleUserInteraction);
  window.addEventListener('click', handleUserInteraction);
  window.addEventListener('touchstart', handleUserInteraction);
  window.addEventListener('scroll', handleUserInteraction);
  window.addEventListener('keydown', handleUserInteraction);
});

onUnmounted(() => {
  removeInteractionListeners();
  if (playerRef.value && typeof playerRef.value.destroy === 'function') {
    playerRef.value.destroy();
  }
});
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40 select-none">
    <!-- Invisible YouTube IFrame Container -->
    <div
      class="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
    >
      <div :id="containerId" />
    </div>

    <!-- Floating Audio Control Pill -->
    <button
      @click="toggleMusic"
      class="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
      :class="[
        theme === 'v1'
          ? 'bg-[#FFFDF8]/95 border-2 border-secondary/60 text-secondary-dark shadow-[0_4px_25px_rgba(197,160,70,0.3)] hover:border-secondary'
          : 'bg-gradient-to-r from-emerald-950/90 via-[#14241B]/95 to-emerald-950/90 border-2 border-amber-500/60 text-amber-200 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:border-amber-400',
        !isPlaying ? 'animate-pulse' : '',
      ]"
      :title="isPlaying ? 'Mute Music' : 'Play Music'"
    >
      <!-- Soundwave Animation when playing -->
      <div v-if="isPlaying" class="flex items-end gap-0.5 h-4">
        <span
          class="w-1 rounded-full animate-bounce [animation-delay:0ms] h-3"
          :class="theme === 'v1' ? 'bg-secondary-dark' : 'bg-amber-400'"
        />
        <span
          class="w-1 rounded-full animate-bounce [animation-delay:150ms] h-4"
          :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-300'"
        />
        <span
          class="w-1 rounded-full animate-bounce [animation-delay:300ms] h-2"
          :class="theme === 'v1' ? 'bg-secondary-dark' : 'bg-amber-400'"
        />
        <span
          class="w-1 rounded-full animate-bounce [animation-delay:450ms] h-3.5"
          :class="theme === 'v1' ? 'bg-secondary' : 'bg-amber-300'"
        />
      </div>

      <!-- Music Vector SVG Icon when muted -->
      <div
        v-else
        :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-400'"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
          />
        </svg>
      </div>

      <span
        class="font-body text-xs font-semibold pr-1"
        :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-200'"
      >
        {{ isPlaying ? 'បទភ្លេង' : 'បើកភ្លេង' }}
      </span>
    </button>
  </div>
</template>
