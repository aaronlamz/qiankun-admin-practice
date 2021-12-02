import Vue from 'vue'
import VRouter from 'vue-router'
import { projectName } from '@/config'

Vue.use(VRouter)
let childRoutes = []
const files = require.context('./modules', true, /\.js$/)
files.keys().forEach(key => {
    childRoutes = childRoutes.concat(files(key).default)
})

const routes = [
    {
        path: '/',
        redirect: `/${projectName}`
    },
    {
        name: 'Home',
        path: `/${projectName}`,
        component: () => import('@/pages/home/index.vue'),
        meta: {
            title: 'Home'
        }
    },
    ...childRoutes
]

const microAppPrefix = `/${projectName}`
const setRoutesMicroAppPrefix = routes => {
    if (routes.length) {
        routes.forEach(item => {
            if (
                item.path &&
                item.path.indexOf(microAppPrefix) === -1 &&
                item.path !== '/'
            ) {
                item.path = `${microAppPrefix}${item.path}`
            }
            if (item.children && item.children.length) {
                setRoutesMicroAppPrefix(item.children)
            }
        })
    }
}
setRoutesMicroAppPrefix(routes)
console.log(routes)
export { routes }
