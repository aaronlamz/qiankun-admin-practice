const routes = [
    {
        name: 'menu-1',
        path: '/menu-1',
        component: () => import('@/pages/menu-1/index.vue'),
        meta: { title: 'menu-1' }
    },
    {
        name: 'menu-2',
        path: '/menu-2',
        component: () => import('@/pages/menu-2/index.vue'),
        meta: { title: 'menu-2' }
    },
    {
        name: 'menu-3-1-1',
        path: '/menu-3-1-1',
        component: () => import('@/pages/menu/index.vue'),
        meta: { title: 'menu-3-1-1' }
    },
    {
        name: 'menu-3-1-2',
        path: '/menu-3-1-2',
        component: () => import('@/pages/menu/index.vue'),
        meta: { title: 'menu-3-1-2' }
    },
    {
        name: 'menu-3-2',
        path: '/menu-3-2',
        component: () => import('@/pages/menu/index.vue'),
        meta: { title: 'menu-3-2' }
    }
]
export default routes
