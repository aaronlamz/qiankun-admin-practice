import { registerMicroApps, initGlobalState, prefetchApps } from 'qiankun'
import store from '@/store'
import LS from '@/utils/localstorage'

interface AppType {
    name: string
    entry: string
    container: string
    activeRule: any
    props: {
        store: any
    }
}

const getActiveRule = (hash: string) => (location: typeof window.location) =>
    location.hash.startsWith(hash)

const apps: Array<AppType> = [
    {
        name: 'subapp-template-vue2',
        entry: '//localhost:8082/',
        container: '#subapp-container',
        activeRule: getActiveRule('#/subapp-template-vue2'),
        props: {
            store,
        },
    },
    {
        name: 'subapp-template-vue3',
        entry: '//localhost:8085/',
        container: '#subapp-container',
        activeRule: getActiveRule('#/subapp-template-vue3'),
        props: {
            store,
        },
    },
]

const initMicroState = () => {
    const { onGlobalStateChange, setGlobalState } = initGlobalState({
        user: {
            name: 'main',
        },
        routes: [],
    })
    onGlobalStateChange((value: any) => {
        // cahced subapp route title and name
        if (value && value.routes && value.routes.length) {
            const subappRouteMap = LS.get('CACHED_SUBAPP_ROUTE_MAP') || {}
            const subappRoutes = value.routes
            subappRoutes.forEach((item) => {
                if (item.name) {
                    subappRouteMap[item.path] = {
                        name: item.name,
                        title: item.meta.title,
                    }
                } else {
                    delete subappRouteMap[item.path]
                }
            })
            LS.put('CACHED_SUBAPP_ROUTE_MAP', subappRouteMap)
        }
    })
    setGlobalState({
        routes: [],
    })
}

export const initMicroApps: () => void = () => {
    registerMicroApps(apps)
    prefetchApps(apps)
    initMicroState()
}
