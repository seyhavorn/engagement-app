import { createRouter, createWebHashHistory } from 'vue-router';
import DesignV1View from '../views/DesignV1View.vue';
import DesignV2View from '../views/DesignV2View.vue';
import LinkGeneratorView from '../views/LinkGeneratorView.vue';
import GuestDashboardView from '../views/GuestDashboardView.vue';
import CountdownView from '../views/CountdownView.vue';

// Normalize URL if user accesses direct pathname without hash (e.g. /countdown, /v2, /dashboard)
const normalizeDirectPathname = () => {
  if (typeof window === 'undefined') return;
  const pathname = window.location.pathname.toLowerCase();
  const search = window.location.search;
  const hash = window.location.hash;

  const routes = ['countdown', 'timer', 'v1', 'v2', 'royal', 'generate', 'admin', 'dashboard'];
  for (const r of routes) {
    if (pathname.endsWith(`/${r}`) || pathname.endsWith(`/${r}/`)) {
      if (!hash || hash === '#' || hash === '#/') {
        const cleanBase = pathname.replace(new RegExp(`/${r}/?$`, 'i'), '') || '/';
        const newUrl = `${cleanBase}#/${r}${search}`;
        window.history.replaceState(null, '', newUrl);
        break;
      }
    }
  }
};
normalizeDirectPathname();

// Use WebHashHistory for flexible deployment across subpaths and static hosting
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
    {
      path: '/countdown',
      name: 'countdown',
      component: CountdownView,
    },
    {
      path: '/timer',
      name: 'countdown-timer',
      component: CountdownView,
    },
    {
      path: '/generate',
      name: 'link-generator',
      component: LinkGeneratorView,
    },
    {
      path: '/admin',
      name: 'link-generator-admin',
      component: LinkGeneratorView,
    },
    {
      path: '/dashboard',
      name: 'guest-dashboard',
      component: GuestDashboardView,
    },
    // Catch-all redirect
    {
      path: '/:pathMatch(.*)*',
      redirect: (to) => {
        const path = to.path.toLowerCase();
        if (path.includes('countdown') || path.includes('timer')) return '/countdown';
        if (path.includes('v2') || path.includes('royal')) return '/v2';
        if (path.includes('dashboard')) return '/dashboard';
        if (path.includes('generate') || path.includes('admin')) return '/generate';
        return '/';
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  // If landed on root '/' but pathname actually requested /countdown, redirect to /countdown
  if (to.path === '/' && typeof window !== 'undefined') {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/countdown') || pathname.includes('/timer')) {
      return next({ path: '/countdown', query: to.query });
    }
    if (pathname.includes('/v2') || pathname.includes('/royal')) {
      return next({ path: '/v2', query: to.query });
    }
    if (pathname.includes('/dashboard')) {
      return next({ path: '/dashboard', query: to.query });
    }
    if (pathname.includes('/generate') || pathname.includes('/admin')) {
      return next({ path: '/generate', query: to.query });
    }
  }
  next();
});

export default router;
