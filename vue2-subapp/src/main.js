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

export async function unmount() {
    //hack unmount 默认会删除容器内的所/有内容，包括子应用渲染的内容，所以需要在子应用中重写 unmount 方法，阻止容器内的内容被删除
    // 如果页签全部关闭，需要手动卸载子应用 TODO
    throw new Error('unmount')
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}
