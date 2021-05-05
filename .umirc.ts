import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
    },
    {
      path: '/admin',
      component: '@/layouts/admin',
      routes: [
        {
          path: '/admin',
          component: '@/pages/admin/userManager',
        },
        {
          path: '/admin/orderManager',
          component: '@/pages/admin/orderManager',
        },
        {
          path: '/admin/appeal',
          component: '@/pages/admin/appeal',
        },
      ],
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
        {
          path: '/forum',
          component: '@/pages/forum',
        },
        {
          path: '/chat',
          component: '@/pages/chat',
        },
        {
          path: '/person',
          component: '@/pages/person',
        },
        {
          path: '/person/ownHelpOrders',
          component: '@/pages/ownHelpOrders',
        },
        {
          path: '/person/ownApproveHelpOrders',
          component: '@/pages/ownApproveHelpOrders',
        },
      ],
    },
  ],
});
