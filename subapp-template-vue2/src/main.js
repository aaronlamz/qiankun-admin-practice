import './public-path'
import store from '@/store'
import { routes } from '@/router'
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'
import { qiankunCachedKey } from '@/config'

let router = null
let instance = null

function render(props = {}) {
    const { container } = props
    router = new VueRouter({
        routes
    })
    if (window.__POWERED_BY_QIANKUN__ && window[qiankunCachedKey]) {
        const cachedInstance = window[qiankunCachedKey]
        const cachedNode =
            (cachedInstance.cachedInstance &&
                cachedInstance.cachedInstance._vnode) ||
            cachedInstance._vnode
        router.apps.push(...cachedInstance.$router.apps)
        cachedNode.data.keepAlive = true

        instance = new Vue({
            router,
            store,
            render: () => cachedNode
        })

        instance.cachedInstance = cachedInstance

        router.onReady(() => {
            const { path } = router.currentRoute
            const { path: oldPath } = cachedInstance.$router.currentRoute
            if (path !== oldPath) {
                cachedInstance.$router.push(path)
            }
        })
        instance.$mount(container ? container.querySelector('#app') : '#app')
    } else {
        instance = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount(container ? container.querySelector('#app') : '#app')
    }
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {
    console.log('%c ', 'color: green;', 'vue app bootstraped')
}

function setupStore(props) {
    props.onGlobalStateChange &&
        props.onGlobalStateChange(
            (value, prev) =>
                console.log(
                    `[onGlobalStateChange - ${props.name}]:`,
                    value,
                    prev
                ),
            true
        )
    props.setGlobalState &&
        props.setGlobalState({
            ignore: props.name,
            user: {
                name: props.name
            },
            routes
        })
}

export async function mount(props) {
    setupStore(props)
    render(props)
}

export async function unmount() {
    console.log('vue app unmount')
    window[qiankunCachedKey] = instance.cachedInstance || instance
}
