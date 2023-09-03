import './public-path'
import store from '@/store'
import { routes } from '@/router'
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'

let router = null

function render(props = {}) {
    const data = props
    const { container } = props
    router = new VueRouter({
        routes
    })
    new Vue({
        router,
        store,
        data() {
            return {
                mainStore: data.store
            }
        },
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

function setupState(props) {
    props.setGlobalState &&
        props.setGlobalState({
            routes
        })
}

export async function bootstrap() {
    console.log('vue2 app bootstraped')
}

export async function mount(props) {
    setupState(props)
    render(props)
}

export async function unmount(props) {
    console.log('vue2 app  unmount')
    const { container } = props
    const dom = document.querySelector(container)
    if (dom) {
        dom.style.display = 'none'
    }
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}
