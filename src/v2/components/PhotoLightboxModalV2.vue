<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    images: string[];
    initialIndex: number;
    theme?: 'v1' | 'v2';
  }>(),
  {
    theme: 'v1',
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentIndex = ref(props.initialIndex);

watch(
  () => props.initialIndex,
  (newVal) => {
    currentIndex.value = newVal;
  },
);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.visible) return;
  if (e.key === 'Escape') emit('close');
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md select-none"
      :class="theme === 'v1' ? 'bg-[#FFFDF8]/95' : 'bg-black/90'"
      @click.self="emit('close')"
    >
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-5 right-5 z-50 p-2.5 rounded-full border transition-all duration-300 shadow-md cursor-pointer"
        :class="
          theme === 'v1'
            ? 'bg-[#FFFDF8] border-secondary/60 text-secondary-dark hover:bg-secondary hover:text-white'
            : 'bg-emerald-950/80 border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-600'
        "
        aria-label="Close"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Left Arrow -->
      <button
        @click="prevImage"
        class="absolute left-3 sm:left-6 z-50 p-3 rounded-full border transition-all duration-300 shadow-md cursor-pointer"
        :class="
          theme === 'v1'
            ? 'bg-[#FFFDF8] border-secondary/60 text-secondary-dark hover:bg-secondary hover:text-white'
            : 'bg-emerald-950/80 border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-600'
        "
        aria-label="Previous image"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Main Image Container -->
      <div
        class="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
      >
        <img
          :src="images[currentIndex]"
          alt="Seyha & David Full View"
          class="max-w-full max-h-[80vh] object-contain rounded-2xl border-2 shadow-2xl"
          :class="
            theme === 'v1'
              ? 'border-secondary/50 bg-[#FFFDF8]'
              : 'border-amber-500/40 bg-black/40'
          "
        />
        <!-- Counter Badge -->
        <div
          class="mt-3 px-4 py-1 rounded-full border font-semibold text-xs tracking-widest shadow-sm"
          :class="
            theme === 'v1'
              ? 'bg-[#FFFDF8] border-secondary/50 text-secondary-dark'
              : 'bg-emerald-950/90 border-amber-500/40 text-amber-300 font-mono'
          "
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="nextImage"
        class="absolute right-3 sm:right-6 z-50 p-3 rounded-full border transition-all duration-300 shadow-md cursor-pointer"
        :class="
          theme === 'v1'
            ? 'bg-[#FFFDF8] border-secondary/60 text-secondary-dark hover:bg-secondary hover:text-white'
            : 'bg-emerald-950/80 border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-600'
        "
        aria-label="Next image"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>
