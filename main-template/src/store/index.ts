import { createStore } from 'vuex'
import type { App } from 'vue'
import app from './modules/app'
import tab from './modules/tab'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        tab,
    },
})

export const setupStore = (app: App) => {
    app.use(store)
}

export default store
