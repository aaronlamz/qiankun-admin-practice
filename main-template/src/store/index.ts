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
        // fetch menuList data from service
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
                        menuName: 'Vue2-MENU-3',
                        url: '/subapp-template-vue2/menu-3',
                        menuList: [
                            {
                                id: '5',
                                parentId: '4',
                                menuName: 'Vue2-MENU-3-1',
                                url: '/subapp-template-vue2/menu-3-1',
                                menuList: [
                                    {
                                        id: '7',
                                        parentId: '5',
                                        menuName: 'Vue2-MENU-3-1-1',
                                        url: '/subapp-template-vue2/menu-3-1-1',
                                    },
                                    {
                                        id: '8',
                                        parentId: '5',
                                        menuName: 'Vue2-MENU-3-1-2',
                                        url: '/subapp-template-vue2/menu-3-1-2',
                                    },
                                ],
                            },
                            {
                                id: '6',
                                parentId: '4',
                                menuName: 'Vue2-MENU-3-2',
                                url: '/subapp-template-vue2/menu-3-2',
                            },
                        ],
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
                '/subapp-template-vue2/menu-1': 'Vue2-MENU-1',
                '/subapp-template-vue2/menu-2': 'Vue2-MENU-2',
                '/subapp-template-vue2/menu-3': 'Vue2-MENU-3',
                '/subapp-template-vue2/menu-3-1': 'Vue2-MENU-3-1',
                '/subapp-template-vue2/menu-3-1-1': 'Vue2-MENU-3-1-1',
                '/subapp-template-vue2/menu-3-1-2': 'Vue2-MENU-3-1-2',
                '/subapp-template-vue2/menu-3-2': 'Vue2-MENU-3-2',
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
