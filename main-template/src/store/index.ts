import { createStore } from 'vuex'
import type { App } from 'vue'
import app from './modules/app'
import tab from './modules/tab'
import login from './modules/login'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        tab,
        login,
    },
})

export const setupStore = (app: App) => {
    app.use(store)
}

export default store
