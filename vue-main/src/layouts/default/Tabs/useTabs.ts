import LS from '@/utils/localstorage'

// get subapp route title from cache or service
export const getTitleByPath = (path: string) => {
    if (!path) return
    let title = ''
    const serviceRouteMap = LS.get('CACHED_SERVICE_ROUTE_MAP') || {}
    const subappRouteMap = LS.get('CACHED_SUBAPP_ROUTE_MAP') || {}
    const item = serviceRouteMap[path] || subappRouteMap[path] || {}
    title = item.title || ''
    return title
}

export const getNameByPath = (path: string) => {
    if (!path) return
    let name = ''
    const serviceRouteMap = LS.get('CACHED_SERVICE_ROUTE_MAP') || {}
    const subappRouteMap = LS.get('CACHED_SUBAPP_ROUTE_MAP') || {}
    const item = serviceRouteMap[path] || subappRouteMap[path] || {}
    name = item.name || ''
    return name
}
