import { RouteLocationNormalized } from 'vue-router'

interface State {
    visitedTabs: Array<RouteLocationNormalized>
    cachedTabs: Array<any>
}

export default {
    state: {
        visitedTabs: [],
        cachedTabs: [],
    },
    mutations: {
        commitAddVisitedTab(state: State, route: RouteLocationNormalized) {
            if (state.visitedTabs.some((v) => v.path === route.path)) {
                return
            }
            state.visitedTabs.push(
                Object.assign({}, route, {
                    title: route.meta.title || 'no-title',
                })
            )
        },
        commitUpdateVisitedTab(state: State, route: RouteLocationNormalized) {
            for (let v of state.visitedTabs) {
                if (v.path === route.path) {
                    v = Object.assign(v, route)
                    break
                }
            }
        },
        commitAddCachedTab(state: State, route: RouteLocationNormalized) {
            if (state.cachedTabs.includes(route.name)) return
            if (!route.meta.ignoreKeepAlive) {
                state.cachedTabs.push(route.name)
            }
        },
        commitCloseVisitedTab(state: State, route: RouteLocationNormalized) {
            for (const [i, v] of state.visitedTabs.entries()) {
                if (v.path && v.path === route.path) {
                    state.visitedTabs.splice(i, 1)
                    break
                }
            }
        },
        commitCloseCachedTab(state: State, route: RouteLocationNormalized) {
            for (const i of state.cachedTabs) {
                if (i === route.name) {
                    const index = state.cachedTabs.indexOf(i)
                    state.cachedTabs.splice(index, 1)
                    break
                }
            }
        },
    },
    actions: {
        updateTabAction({ commit }: any, route: RouteLocationNormalized) {
            commit('commitUpdateVisitedTab', route)
        },
        addTabAction({ commit }: any, route: RouteLocationNormalized) {
            commit('commitAddVisitedTab', route)
            commit('commitAddCachedTab', route)
        },
        closeTabAction({ commit }: any, route: RouteLocationNormalized) {
            commit('commitCloseVisitedTab', route)
            commit('commitCloseCachedTab', route)
        },
        closeTabByKeyAction({ dispatch, state }: any, key: string) {
            const index = state.visitedTabs.findIndex(
                (item: RouteLocationNormalized) => item.path === key
            )
            index !== -1 && dispatch('closeTabAction', state.visitedTabs[index])
        },
    },
    getters: {},
}
