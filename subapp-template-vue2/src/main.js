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
    const data = props
    const { container } = props
    router = new VueRouter({
        routes
    })
    if (window.__POWERED_BY_QIANKUN__ && window[qiankunCachedKey]) {
        const cachedInstance = window[qiankunCachedKey]
        const cachedNode = cachedInstance._vnode
        router.apps.push(...cachedInstance.$router.apps)
        cachedNode.data.keepAlive = true

        instance = new Vue({
            router,
            store,
            data() {
                return {
                    mainStore: data.store
                }
            },
            render: () => cachedNode
        })

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
            data() {
                return {
                    mainStore: data.store
                }
            },
            render: h => h(App)
        }).$mount(container ? container.querySelector('#app') : '#app')
        console.log('vue2 instance', instance, instance._vnode.data.keepAlive)
    }
}

function setupState(props) {
    props.setGlobalState &&
        props.setGlobalState({
            routes
        })
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {
    console.log('subapp bootstraped')
}

export async function mount(props) {
    setupState(props)
    render(props)
}

export async function unmount() {
    console.log('subapp unmount')
    window[qiankunCachedKey] = instance
}
