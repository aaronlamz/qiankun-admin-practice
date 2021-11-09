export interface Menu {
    name: string
    icon?: string
    path: string
    disabled?: boolean
    children?: Menu[]
    meta?: Partial<RouteMeta>
    tag?: MenuTag
    hideMenu?: boolean
}

export interface RouteMeta {
    title: string
    ignoreKeepAlive?: boolean
    icon?: string | undefined
}
