<template lang="pug">
ElSubmenu(:index="item.id")
    template(#title)
        BasicMenuItemContent(:item="item")
    template(
        v-for="child in item.children"
        :key="item.id"
        )
        BasicSidebarItem(
            v-if="child.children && child.children.length > 0"
            :item="child"
            )
        BasicMenuItem(
            v-else
            :item="child"
            @click="handleMenuClick(child.path)"
            )
</template>
<script lang="ts">
import type { Menu as MenuType } from '@/router/types'
import { defineComponent } from 'vue'
import { ElSubmenu } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import { itemProps } from '../props'
import BasicMenuItem from './BasicMenuItem.vue'
import BasicMenuItemContent from './BasicMenuItemContent.vue'
import { useGoPage } from '@/hooks/web/usePage'
export default defineComponent({
    name: 'BasicSidebarItem',
    emits: ['handle-menu-click'],
    components: {
        BasicMenuItem,
        BasicMenuItemContent,
        ElSubmenu,
    },
    props: itemProps,
    setup() {
        const { prefixCls } = useNamespace('basic-menu-item')
        const go = useGoPage()
        const menuHasChildren = (menuTreeItem: MenuType): boolean => {
            return (
                Reflect.has(menuTreeItem, 'children') &&
                !!menuTreeItem.children &&
                menuTreeItem.children.length > 0
            )
        }
        const handleMenuClick = (path: string) => {
            go(path)
        }
        return {
            prefixCls,
            menuHasChildren,
            handleMenuClick,
        }
    },
})
</script>
