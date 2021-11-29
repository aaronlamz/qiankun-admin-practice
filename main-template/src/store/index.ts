import { createStore } from 'vuex'
import type { App } from 'vue'
import app from './modules/app'
import tab from './modules/tab'
import { useFormatMenuList } from '@/layouts/default/Menu/useMenu'

interface State {
    menuList: Array<any>
}

const store = createStore({
    state: {
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
                            },
                        ],
                    },
                ],
            },
        ],
    },
    mutations: {},
    actions: {},
    modules: {
        app,
        tab,
    },
    getters: {
        getMenuList(state: State) {
            return useFormatMenuList(state.menuList)
        },
    },
})

export const setupStore = (app: App) => {
    app.use(store)
}

export default store
