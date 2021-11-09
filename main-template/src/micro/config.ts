import { registerMicroApps, initGlobalState } from 'qiankun'
import { RouteRecordRaw } from 'vue-router'
import { API_BASE_URL } from '@/utils/env/DOMAIN'
import type { MenuRouteItem } from '@/layouts/default/Menu/types'
import LS from '@/utils/local-storage'
import store from '@/store'
import router from '@/router'

interface AppType {
    name: string
    entry: string
    container: string
    activeRule: any
    props: {
        store: any
        router?: any
        BaseRequest?: any
    }
}

const getActiveRule = (hash: string) => (location: typeof window.location) =>
    location.hash.startsWith(hash)

const apps: Array<AppType> = [
    {
        name: 'subapp-tempalte-vue2',
        entry: API_BASE_URL.SUBAPP_ADMIN,
        container: '#subapp-container',
        activeRule: getActiveRule('#/subapp-tempalte-vue2'),
        props: {
            store,
            router,
        },
    },
]

const initMicroState = () => {
    const { onGlobalStateChange, setGlobalState } = initGlobalState({
        ignore: 'main',
        user: {
            name: 'main',
        },
        routes: [],
    })
    onGlobalStateChange((value: any) => {
        const cachedRoutes = LS.get('CACHED_ROUTES') || []
        const toCacheRoutes: Array<MenuRouteItem> = []
        // cached subapp routes
        if (value && value.routes.length) {
            const subappRoute = value.routes.find(
                (item: MenuRouteItem) => item.children && item.children.length
            )
            if (subappRoute) {
                subappRoute.children.forEach((route: MenuRouteItem) => {
                    const isExistCachedRoute = cachedRoutes.find(
                        (item: RouteRecordRaw) => item.path === route.path
                    )
                    if (
                        route.path &&
                        route.meta &&
                        route.meta.title &&
                        !isExistCachedRoute
                    ) {
                        toCacheRoutes.push(route)
                    }
                })
                LS.put('CACHED_ROUTES', [...cachedRoutes, ...toCacheRoutes])
            }
        }
    })
    setGlobalState({
        routes: [],
    })
}

export const initMicroApps: () => void = () => {
    registerMicroApps(apps)
    initMicroState()
}
