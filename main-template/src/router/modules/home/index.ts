import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import Dashboard from '@/views/Dashboard.vue'
import Framework from '@/views/Framework.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        component: Layout,
        name: 'Home',
        meta: {
            title: 'Home',
        },
        children: [
            {
                path: '',
                name: 'Dashboard',
                meta: {
                    title: 'Dashboard',
                },
                component: Dashboard,
            },
            {
                path: '/:subapp+',
                name: 'subapp-name',
                meta: {
                    title: 'subapp-title',
                },
                component: Framework,
            },
        ],
    }
]

export default routes
