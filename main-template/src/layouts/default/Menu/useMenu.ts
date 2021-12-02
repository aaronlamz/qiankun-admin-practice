import type { MenuRouteItem, MenuSelectVoItem } from './types'

export const useFormatMenuListToRoutes = () => {
    const tempArray = [] as any
    function formatToRoutes(routes: Array<MenuRouteItem>) {
        if (routes.length === 0) return
        routes.forEach((item) => {
            if (item.path) {
                tempArray.push({
                    path: item.path,
                    name: item.name,
                    meta: {
                        title: item.meta.title,
                    },
                })
            }
            if (item.children) {
                formatToRoutes(item.children)
            }
        })
        return tempArray
    }
    return formatToRoutes
}

// get MenuId by path
export const useGetIdByPath = () => {
    let id = ''
    function getId(menuList: Array<MenuRouteItem>, path: string) {
        if (path && menuList && menuList.length) {
            menuList.forEach((item) => {
                if (item.path === path) {
                    id = item.id || ''
                } else if (item.children && item.children.length) {
                    getId(item.children, path)
                }
            })
        }
        return id
    }
    return getId
}

// get MenuItem by path
export const useGetMenuItemByPath = () => {
    let MenuItem: MenuRouteItem
    function getMenuItem(menuList: Array<MenuRouteItem>, path: string) {
        if (path && menuList.length) {
            menuList.forEach((item) => {
                if (item.path === path) {
                    MenuItem = item
                } else if (item.children && item.children.length) {
                    getMenuItem(item.children, path)
                }
            })
        }
        return MenuItem
    }
    return getMenuItem
}

// formart menuList data structure to routeRecordRaw
export const useFormatMenuList = (menuList: Array<MenuSelectVoItem>) => {
    const routes: Array<MenuRouteItem> = []
    if (menuList && menuList.length) {
        menuList.forEach((item: MenuSelectVoItem) => {
            const menuItem = {} as MenuRouteItem
            menuItem.id = item.id ? item.id + '' : '' // ElementUI Menu required String Type, if id === undefined will cause menu selected style invalid
            menuItem.url = item.url
            menuItem.name =
                item.url && item.url.slice(item.url.lastIndexOf('/') + 1) // keepAlive name
            menuItem.path = item.url
            menuItem.meta = {
                title: item.menuName,
                icon: item.menuIcon,
            }
            if (item.menuList) {
                menuItem.children = useFormatMenuList(item.menuList) || []
            }
            routes.push(menuItem)
        })
    }
    return routes
}
