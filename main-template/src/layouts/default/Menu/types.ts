import type { RouteMeta } from '@/router/types'

export interface MenuRouteItem {
    id: string
    name?: string | undefined
    path: string
    url: string
    children?: MenuRouteItem[]
    meta: Partial<RouteMeta>
}

export interface MenuSelectVoItem {
    id: string | number
    menuName: string | undefined
    url: string
    menuSelectVoList: MenuSelectVoItem[]
    [key: string]: any
}
