const routes = [
    {
        name: 'about',
        path: '/about',
        component: () => import('@/pages/about/index.vue'),
        meta: { title: 'about' }
    }
]
export default routes
