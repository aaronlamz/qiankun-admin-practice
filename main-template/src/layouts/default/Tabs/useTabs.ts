import LS from '@/utils/local-storage'
import store from '@/store'
import { useGetMenuItemByPath } from '@/layouts/default/Menu/useMenu'
import type { MenuRouteItem } from '@/layouts/default/Menu/types'
import { RouteRecordRaw } from 'vue-router'

const getMenuItem = useGetMenuItemByPath()

// get subapp route title from cache or service
export const getTabTitlebyPath = async (path: string) => {
    if (!path || path === '/index') return ''
    const cachedRoutes = LS.get('CACHED_ROUTES') || []
    const getCachedRoute = cachedRoutes.find(
        (item: RouteRecordRaw) => item.path === path
    )
    if (getCachedRoute) {
        return getCachedRoute.meta ? getCachedRoute.meta.title : ''
    } else {
        let menuItem = {} as MenuRouteItem
        await store.dispatch('loginTicketAction')
        const menuList = store.getters.getFormatMenuList
        menuItem = getMenuItem(menuList, path) || {}
        return menuItem.meta ? menuItem.meta.title : ''
    }
}
