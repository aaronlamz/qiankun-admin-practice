import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import Home from './modules/home'

const routes: Array<RouteRecordRaw> = [...Home]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export async function setupRouter(app: App) {
    app.use(router)
}

export default router
