import { registerMicroApps, initGlobalState, prefetchApps } from 'qiankun'
import store from '@/store'

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
]

const initMicroState = () => {
    const { onGlobalStateChange, setGlobalState } = initGlobalState({
        user: {
            name: 'main',
        },
        routes: [],
    })
    onGlobalStateChange((value: any) => {
        console.log(value)
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
