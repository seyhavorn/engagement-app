<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  visible: boolean;
  guestName: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const attendance = ref<'attending' | 'not_attending'>('attending');
const guestCount = ref('1');
const wishes = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    // Reset after 3s
    submitted.value = false;
    emit('close');
  }, 2500);
};
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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      @click.self="emit('close')"
    >
      <div
        class="relative w-full max-w-md bg-gradient-to-b from-[#182820] via-[#0F1C16] to-[#0A140F] rounded-3xl border-2 border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] p-6 sm:p-8 text-amber-100 overflow-hidden"
      >
        <!-- Gold Frame Corner Ornaments -->
        <div
          class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/80 pointer-events-none"
        />
        <div
          class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 pointer-events-none"
        />
        <div
          class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 pointer-events-none"
        />
        <div
          class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/80 pointer-events-none"
        />

        <!-- Close Button -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 p-2 rounded-full text-amber-400/70 hover:text-amber-200 hover:bg-amber-500/20 transition-colors"
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

        <!-- Header -->
        <div class="text-center mb-6">
          <svg
            class="w-8 h-8 text-amber-400 mx-auto"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
          <h3
            class="font-heading text-xl sm:text-2xl text-amber-200 mt-1 font-normal"
          >
            ឆ្លើយតបការអញ្ជើញ
          </h3>
          <p class="font-body text-xs text-amber-400/80 mt-0.5">
            សូមបញ្ជាក់វត្តមានចូលរួមរបស់លោកអ្នក
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="submitted"
          class="py-10 text-center space-y-3 animate-fade-in"
        >
          <svg
            class="w-12 h-12 text-amber-400 mx-auto animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <h4 class="font-heading text-xl text-amber-200 font-semibold">
            សូមអរគុណយ៉ាងជ្រាលជ្រៅ!
          </h4>
          <p class="font-body text-xs text-amber-100/80 leading-relaxed px-4">
            ការឆ្លើយតបរបស់លោកអ្នកត្រូវបានកត់ត្រារួចរាល់។
            យើងខ្ញុំទន្ទឹងរង់ចាំជួបលោកអ្នកក្នុងថ្ងៃសិរីមង្គលនេះ!
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Guest Name Field -->
          <div>
            <label
              class="block font-body text-xs text-amber-300 font-semibold mb-1"
            >
              ឈ្មោះភ្ញៀវកិត្តិយស
            </label>
            <input
              type="text"
              :value="guestName"
              readonly
              class="w-full px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-amber-500/40 text-amber-100 font-body text-sm focus:outline-none cursor-default"
            />
          </div>

          <!-- Attendance Options -->
          <div>
            <label
              class="block font-body text-xs text-amber-300 font-semibold mb-2"
            >
              វត្តមានចូលរួម
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="attendance = 'attending'"
                class="py-2.5 px-3 rounded-xl border text-xs font-body font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
                :class="
                  attendance === 'attending'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-amber-300 shadow-md'
                    : 'bg-emerald-950/60 text-amber-300/80 border-amber-500/30 hover:border-amber-400/60'
                "
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
                <span>ចូលរួម</span>
              </button>
              <button
                type="button"
                @click="attendance = 'not_attending'"
                class="py-2.5 px-3 rounded-xl border text-xs font-body font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
                :class="
                  attendance === 'not_attending'
                    ? 'bg-gradient-to-r from-red-700 to-red-600 text-white border-red-400 shadow-md'
                    : 'bg-emerald-950/60 text-amber-300/80 border-amber-500/30 hover:border-amber-400/60'
                "
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
                <span>អវត្តមាន</span>
              </button>
            </div>
          </div>

          <!-- Guest Count -->
          <div v-if="attendance === 'attending'">
            <label
              class="block font-body text-xs text-amber-300 font-semibold mb-1"
            >
              ចំនួនអ្នកចូលរួម
            </label>
            <select
              v-model="guestCount"
              class="w-full px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-amber-500/40 text-amber-100 font-body text-sm focus:outline-none"
            >
              <option value="1">១ នាក់</option>
              <option value="2">២ នាក់</option>
              <option value="3">៣ នាក់</option>
              <option value="4+">៤ នាក់ឡើង</option>
            </select>
          </div>

          <!-- Wishes / Message -->
          <div>
            <label
              class="block font-body text-xs text-amber-300 font-semibold mb-1"
            >
              សារជូនពរ
            </label>
            <textarea
              v-model="wishes"
              rows="3"
              placeholder="សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មីជួបតែសេចក្តីសុខ សុភមង្គល..."
              class="w-full px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-amber-500/40 text-amber-100 font-body text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-body text-sm font-bold tracking-wide shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            ផ្ញើការឆ្លើយតប
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>
