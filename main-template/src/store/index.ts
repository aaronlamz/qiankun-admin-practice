import { createStore } from 'vuex'
import type { App } from 'vue'
import app from './modules/app'
import tab from './modules/tab'
import { useFormatMenuList } from '@/layouts/default/Menu/useMenu'
import LS from '@/utils/localstorage'

interface State {
    count: number
    menuList: Array<any>
}

const store = createStore({
    state: {
        count: 0,
        // mock data: fetch menuList data from service
        menuList: [
            {
                id: '1',
                menuName: 'ADMIN',
                url: '',
                menuList: [
                    {
                        id: '2',
                        parentId: '1',
                        menuName: 'Vue2-MENU-1',
                        url: '/subapp-template-vue2/menu-1',
                    },
                    {
                        id: '3',
                        parentId: '1',
                        menuName: 'Vue2-MENU-2',
                        url: '/subapp-template-vue2/menu-2',
                    },
                    {
                        id: '4',
                        parentId: '1',
                        menuName: 'Vue3-MENU-1',
                        url: '/subapp-template-vue3/menu-1',
                    },
                    {
                        id: '5',
                        parentId: '1',
                        menuName: 'Vue3-MENU-2',
                        url: '/subapp-template-vue3/menu-2',
                    },
                ],
            },
        ],
    },
    mutations: {
        increment(state) {
            state.count++
        },
    },
    actions: {},
    modules: {
        app,
        tab,
    },
    getters: {
        getMenuList(state: State) {
            // you can format data depend on menuList data
            const servieRouteMap = {
                '/subapp-template-vue2/menu-1': {
                    name: 'menu-1',
                    title: 'Vue2-MENU-1',
                },
                '/subapp-template-vue2/menu-2': {
                    name: 'menu-2',
                    title: 'Vue2-MENU-2',
                },
                '/subapp-template-vue3/menu-1': {
                    name: 'menu-1',
                    title: 'Vue3-MENU-1',
                },
                '/subapp-template-vue3/menu-2': {
                    name: 'menu-2',
                    title: 'Vue3-MENU-2',
                },
            }
            LS.put('CACHED_SERVICE_ROUTE_MAP', servieRouteMap)
            return useFormatMenuList(state.menuList)
        },
        getCount(state: State) {
            return state.count
        },
    },
})

export const setupStore = (app: App) => {
    app.use(store)
}

export default store
