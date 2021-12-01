<template lang="pug">
AppLogo
ElScrollbar(
    :class="getScrollbarClass"
    )
    ElMenu(
        :class="prefixCls"
        :default-active="activeId"
        :default-openeds="openeds"

    )
        template(
            v-for="item in getMenuItems"
            :key="item.id"
            )
                BasicSidebarItem(
                    :item="item"
                )
</template>

<script lang="ts">
import { defineComponent, computed, watch, reactive, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useGoPage } from '@/hooks/web/usePage'
import BasicSidebarItem from './components/BasicSidebarItem.vue'
import AppLogo from './components/AppLogo.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useGetIdByPath } from './useMenu'

export default defineComponent({
    name: 'LayoutMenu',
    components: {
        ElScrollbar,
        BasicSidebarItem,
        AppLogo,
    },
    async setup() {
        const go = useGoPage()
        const getId = useGetIdByPath()
        const route = useRoute()
        const store = useStore()
        const openeds = reactive(['1'])
        const activeId = ref('1')
        const { prefixCls } = useNamespace('layout-menu')

        const menuList = store.getters.getMenuList
        const getMenuItems = computed(() => reactive(menuList))
        const getScrollbarClass = computed(() => [`${prefixCls}-scrollbar`])
        const handleMenuClick = (path: string) => {
            go(path)
        }

        activeId.value = getId(menuList, route.path)
        watch(
            () => route.path,
            () => {
                activeId.value = '1'
                if (route.path === '/index') {
                    activeId.value = '1'
                    return
                }
                activeId.value = getId(menuList, route.path)
            }
        )
        return {
            openeds,
            activeId,
            prefixCls,
            getScrollbarClass,
            getMenuItems,
            handleMenuClick,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-menu';
$scrollbar-prefix-cls: '#{$namespace}-layout-menu-scrollbar';
.#{$prefix-cls} {
    display: flex;
    flex-direction: column;
    border: none;
    background-color: $sider-bg-color;
    .el-submenu__icon-arrow {
        right: 14px;
    }
    .el-menu-item {
        height: 50px;
        line-height: 50px;
        color: $white-a7;
    }
    .el-submenu {
        background-color: $sider-bg-color;
        .el-menu {
            background-color: $sider-menu-bg-color;
        }
        .el-menu-item {
            padding: 0 30px;
            background-color: $sider-menu-bg-color;
        }
    }
    .el-submenu.is-opened {
        .el-submenu__title {
            background-color: $sider-menu-bg-color;
        }
    }
    .el-menu-item:hover,
    .el-menu-item.is-active,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-submenu.is-opened .el-submenu__title:hover,
    .el-submenu .el-menu-item.is-active {
        background-color: $primary-color;
        color: $white;
    }
    .el-submenu__title {
        color: $white-a7;
        height: 50px;
        line-height: 50px;
    }
}
.#{$scrollbar-prefix-cls} {
    height: calc(100vh - 96px);
}
</style>
