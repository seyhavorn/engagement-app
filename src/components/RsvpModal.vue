<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  visible: boolean;
  guestName?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const name = ref('');
const email = ref('');
const attending = ref('');
const guests = ref('1');
const message = ref('');
const submitted = ref(false);
const isClosing = ref(false);

watch(
  () => props.visible,
  (val) => {
    if (val) {
      submitted.value = false;
      isClosing.value = false;
      // Pre-fill name from guest name if available
      if (props.guestName && !name.value) {
        name.value = props.guestName;
      }
    }
  },
);

function handleClose() {
  isClosing.value = true;
  setTimeout(() => {
    emit('close');
    isClosing.value = false;
  }, 300);
}

function handleSubmit() {
  if (!name.value || !attending.value) return;
  submitted.value = true;
}

function handleOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    handleClose();
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        :class="{ closing: isClosing }"
        @click="handleOverlayClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <!-- Modal Card -->
        <div
          class="relative w-full max-w-md bg-[#FFFDF8]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-secondary/30 overflow-hidden"
        >
          <!-- Gold accent bar at top -->
          <div
            class="h-1.5 w-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark"
          />

          <div class="p-6 sm:p-8">
            <!-- Close Button -->
            <button
              @click="handleClose"
              class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-primary-muted hover:text-primary hover:bg-secondary/10 transition-all duration-200"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- Success State -->
            <div v-if="submitted" class="text-center py-6">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/15 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-secondary-dark"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </div>
              <h3 class="font-accent text-xl text-primary mb-2">អរគុណ!</h3>
              <p class="font-body text-sm text-primary-muted leading-relaxed">
                ការឆ្លើយតបរបស់អ្នកត្រូវបានទទួល។<br />យើងខ្ញុំរង់ចាំអបអរសាទរជាមួយអ្នក!
              </p>
              <button
                @click="handleClose"
                class="mt-6 px-8 py-2.5 rounded-full bg-gradient-to-r from-secondary-dark to-secondary text-white font-body text-sm font-medium tracking-wide hover:shadow-lg transition-all duration-300"
              >
                បិទ
              </button>
            </div>

            <!-- Form State -->
            <div v-else>
              <div class="text-center mb-6">
                <h3 class="font-accent text-xl sm:text-2xl text-primary">
                  សូមឆ្លើយតប
                </h3>
                <p class="font-body text-xs text-primary-muted mt-1 tracking-wide">
                  សូមឆ្លើយតបមុនថ្ងៃទី១ ខែធ្នូ ឆ្នាំ២០២៦
                </p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Name -->
                <div>
                  <label
                    class="block text-xs font-body font-medium text-primary-muted mb-1 tracking-wide"
                  >
                    ឈ្មោះពេញ <span class="text-secondary-dark">*</span>
                  </label>
                  <input
                    v-model="name"
                    type="text"
                    required
                    placeholder="សូមវាយឈ្មោះរបស់អ្នក"
                    class="w-full px-4 py-2.5 rounded-lg border border-secondary/30 bg-ivory/60 font-body text-sm text-primary placeholder-primary-muted/60 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    class="block text-xs font-body font-medium text-primary-muted mb-1 tracking-wide"
                  >
                    អ៊ីមែល
                  </label>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="your@email.com"
                    class="w-full px-4 py-2.5 rounded-lg border border-secondary/30 bg-ivory/60 font-body text-sm text-primary placeholder-primary-muted/60 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
                  />
                </div>

                <!-- Attending -->
                <div>
                  <label
                    class="block text-xs font-body font-medium text-primary-muted mb-1 tracking-wide"
                  >
                    តើអ្នកនឹងចូលរួមទេ? <span class="text-secondary-dark">*</span>
                  </label>
                  <div class="flex gap-3">
                    <label
                      class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer font-body text-sm transition-all duration-200"
                      :class="
                        attending === 'yes'
                          ? 'border-secondary bg-secondary/10 text-secondary-dark font-medium'
                          : 'border-secondary/30 bg-ivory/60 text-primary-muted hover:border-secondary/50'
                      "
                    >
                      <input
                        v-model="attending"
                        type="radio"
                        value="yes"
                        class="sr-only"
                        required
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                        />
                      </svg>
                      ទទួលដោយរីករាយ
                    </label>
                    <label
                      class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer font-body text-sm transition-all duration-200"
                      :class="
                        attending === 'no'
                          ? 'border-secondary/60 bg-secondary/15 text-primary font-medium'
                          : 'border-secondary/30 bg-ivory/60 text-primary-muted hover:border-secondary/50'
                      "
                    >
                      <input
                        v-model="attending"
                        type="radio"
                        value="no"
                        class="sr-only"
                      />
                      សូមអភ័យទោស
                    </label>
                  </div>
                </div>

                <!-- Number of Guests -->
                <div v-if="attending === 'yes'">
                  <label
                    class="block text-xs font-body font-medium text-primary-muted mb-1 tracking-wide"
                  >
                    ចំនួនភ្ញៀវ
                  </label>
                  <select
                    v-model="guests"
                    class="w-full px-4 py-2.5 rounded-lg border border-secondary/30 bg-ivory/60 font-body text-sm text-primary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
                  >
                    <option value="1">១ នាក់</option>
                    <option value="2">២ នាក់</option>
                    <option value="3">៣ នាក់</option>
                    <option value="4">៤ នាក់</option>
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label
                    class="block text-xs font-body font-medium text-primary-muted mb-1 tracking-wide"
                  >
                    សារសម្រាប់គូស្នេហ៍
                  </label>
                  <textarea
                    v-model="message"
                    rows="3"
                    placeholder="សូមចែករំលែកពាក្យសំណេះសំណាល..."
                    class="w-full px-4 py-2.5 rounded-lg border border-secondary/30 bg-ivory/60 font-body text-sm text-primary placeholder-primary-muted/60 resize-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
                  />
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full py-3.5 rounded-full bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white font-body text-sm font-medium tracking-wide hover:shadow-lg hover:shadow-secondary/30 active:scale-[0.98] transition-all duration-300 mt-2"
                >
                  ផ្ញើការឆ្លើយតប
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > div:last-child {
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-leave-active > div:last-child {
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
}

.modal-leave-to {
  opacity: 0;
}
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.closing {
  pointer-events: none;
}
</style>
