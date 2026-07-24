<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    theme?: 'v1' | 'v2';
  }>(),
  {
    theme: 'v1',
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const guestNameInput = ref('');
const copied = ref(false);

const generatedUrl = computed(() => {
  const baseUrl =
    window.location.origin +
    window.location.pathname +
    window.location.hash.split('?')[0];
  const trimmed = guestNameInput.value.trim();
  if (!trimmed) return baseUrl;
  return `${baseUrl}?name=${encodeURIComponent(trimmed)}`;
});

const copyLink = () => {
  if (!generatedUrl.value) return;
  const name = guestNameInput.value.trim() || 'ភ្ញៀវកិត្តិយស';
  const fullTextToCopy = `${generatedUrl.value}\nសូមគោរពអញ្ជើញ ${name} ចូលរួមក្នុងពិធីភ្ជាប់ពាក្យ (វន សីហា & សួង ដាវីត):`;
  navigator.clipboard.writeText(fullTextToCopy);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2500);
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md select-none"
      :class="theme === 'v1' ? 'bg-[#FFFDF8]/90' : 'bg-black/90'"
      @click.self="emit('close')"
    >
      <div
        class="relative w-full max-w-sm p-6 sm:p-7 rounded-3xl border-2 shadow-2xl text-center"
        :class="
          theme === 'v1'
            ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF6E5] border-secondary/50 text-primary'
            : 'bg-gradient-to-b from-[#12241C] via-[#0D1C15] to-[#08140E] border-amber-500/50 text-amber-100'
        "
      >
        <!-- Close button -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer"
          :class="
            theme === 'v1'
              ? 'text-secondary-dark hover:bg-secondary/15'
              : 'text-amber-300 hover:bg-amber-500/20'
          "
        >
          <svg
            class="w-5 h-5"
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

        <h3
          class="font-heading text-lg font-bold mb-1"
          :class="theme === 'v1' ? 'text-primary' : 'text-amber-100'"
        >
          បង្កើតតំណភ្ជាប់អញ្ជើញ
        </h3>
        <p
          class="font-body text-xs mb-4"
          :class="theme === 'v1' ? 'text-primary/70' : 'text-emerald-100/70'"
        >
          បញ្ចូលឈ្មោះភ្ញៀវដើម្បីបង្កើតតំណភ្ជាប់ផ្ទាល់ខ្លួន
        </p>

        <!-- Input Field -->
        <div class="mb-4 text-left">
          <label
            class="block text-xs font-semibold mb-1.5"
            :class="theme === 'v1' ? 'text-secondary-dark' : 'text-amber-300'"
          >
            ឈ្មោះភ្ញៀវ (e.g. សុជាតិ និង ភរិយា)
          </label>
          <input
            v-model="guestNameInput"
            type="text"
            placeholder="បញ្ចូលឈ្មោះភ្ញៀវទីនេះ..."
            class="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
            :class="
              theme === 'v1'
                ? 'bg-white border-secondary/40 text-primary focus:border-secondary shadow-sm'
                : 'bg-emerald-950/80 border-amber-500/40 text-amber-100 focus:border-amber-400'
            "
          />
        </div>

        <!-- Live Link Box -->
        <div
          class="p-3 rounded-xl border text-xs font-mono break-all mb-4 text-left flex items-center justify-between gap-2"
          :class="
            theme === 'v1'
              ? 'bg-white/80 border-secondary/30 text-secondary-dark'
              : 'bg-emerald-950/60 border-amber-500/30 text-amber-200'
          "
        >
          <span class="truncate flex-1">{{ generatedUrl }}</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-2.5">
          <!-- Copy Link Button -->
          <button
            @click="copyLink"
            class="w-full py-3 px-5 rounded-full font-body text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            :class="
              theme === 'v1'
                ? 'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950'
            "
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              />
            </svg>
            <span>{{ copied ? 'បានចម្លងតំណភ្ជាប់!' : 'ចម្លងតំណភ្ជាប់' }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
