import { createRouter, createWebHashHistory } from 'vue-router';
import DesignV1View from '../views/DesignV1View.vue';
import DesignV2View from '../views/DesignV2View.vue';

// Use WebHashHistory or WebHistory for flexible deployment across subpaths
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'design-v1',
      component: DesignV1View,
    },
    {
      path: '/v1',
      name: 'design-v1-explicit',
      component: DesignV1View,
    },
    {
      path: '/v2',
      name: 'design-v2',
      component: DesignV2View,
    },
    {
      path: '/royal',
      name: 'design-v2-royal',
      component: DesignV2View,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
