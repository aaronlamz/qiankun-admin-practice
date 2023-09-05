import type { MenuRouteItem } from './types'
import type { PropType } from 'vue'

export const itemProps = {
    item: {
        type: Object as PropType<MenuRouteItem>,
        default: {},
    },
}

export const contentProps = {
    item: {
        type: Object as PropType<MenuRouteItem>,
        default: null,
    },
}
