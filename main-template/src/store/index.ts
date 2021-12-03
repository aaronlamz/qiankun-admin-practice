import { createStore } from 'vuex'
import type { App } from 'vue'
import app from './modules/app'
import tab from './modules/tab'
import { useFormatMenuList } from '@/layouts/default/Menu/useMenu'

interface State {
    count: number
    menuList: Array<any>
}

const store = createStore({
    state: {
        count: 0,
        // menuList data from service
        menuList: [
            {
                id: '1',
                menuName: 'ADMIN',
                url: '',
                menuList: [
                    {
                        id: '2',
                        parentId: '1',
                        menuName: 'MENU-1',
                        url: '/subapp-template-vue2/menu-1',
                    },
                    {
                        id: '3',
                        parentId: '1',
                        menuName: 'MENU-2',
                        url: '/subapp-template-vue2/menu-2',
                    },
                    {
                        id: '4',
                        parentId: '1',
                        menuName: 'MENU-3',
                        url: '/subapp-template-vue2/menu-3',
                        menuList: [
                            {
                                id: '5',
                                parentId: '4',
                                menuName: 'MENU-3-1',
                                url: '/subapp-template-vue2/menu-3-1',
                                menuList: [
                                    {
                                        id: '7',
                                        parentId: '5',
                                        menuName: 'MENU-3-1-1',
                                        url: '/subapp-template-vue2/menu-3-1-1',
                                    },
                                    {
                                        id: '8',
                                        parentId: '5',
                                        menuName: 'MENU-3-1-2',
                                        url: '/subapp-template-vue2/menu-3-1-2',
                                    },
                                ],
                            },
                            {
                                id: '6',
                                parentId: '4',
                                menuName: 'MENU-3-2',
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
