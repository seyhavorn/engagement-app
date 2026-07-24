import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

// Prevent iOS Safari pinch-to-zoom gestures
document.addEventListener('gesturestart', (e: Event) => {
  e.preventDefault();
});
