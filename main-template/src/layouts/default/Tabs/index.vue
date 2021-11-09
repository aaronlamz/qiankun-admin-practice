<template lang="pug">
div(:class="getWrapClass")
    ElTabs(
        type="card"
        v-model="activeTabRef"
        @tab-remove="handleRemoveTab"
        @tab-click="handleClickTab"
        )
        template(
            v-for="item in getVisitedTabs"
            :key="item.fullPath"
        )
            ElTabPane(
                :closable="item.name !== 'Dashboard'"
                :label="item.meta.title"
                :name="item.path"
                :fullPath="item.fullPath"
                )
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import { ElTabs, ElTabPane, ElScrollbar } from 'element-plus'
import TabContent from './components/TabContent.vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useGoPage } from '@/hooks/web/usePage'
import store from '@/store/index'
import { getTabTitlebyPath } from './useTabs'

export default defineComponent({
    name: 'MultipleTabs',
    components: {
        ElTabs,
        ElTabPane,
        TabContent,
        ElScrollbar,
    },
    setup() {
        const activeTabRef = ref('')
        const route = useRoute()
        const go = useGoPage()
        const { prefixCls } = useNamespace('multiple-tabs')
        const getVisitedTabs = computed(() => {
            return (store.state as any).tab.visitedTabs
        })
        const unClose = computed(
            () => unref((store.state as any).tab.visitedTabs).length === 0
        )
        const getWrapClass = computed(() => {
            return [prefixCls]
        })

        onMounted(async () => {
            const homeRoute = {
                path: '/index',
                name: 'Dashboard',
                meta: {
                    title: 'Dashboard',
                },
            }
            if (unref(unClose) && route.name && route.name !== 'Dashboard') {
                store.dispatch('addTabAction', homeRoute)
            }
            const getTabTitle = await getTabTitlebyPath(route.path)
            route.meta.title = getTabTitle || route.meta.title
            if (route.name) {
                store.dispatch('addTabAction', route)
            }
            // store.dispatch('addTabAction', route)
            activeTabRef.value = route.path
        })

        watch(
            () => route.path,
            async () => {
                if (route.name && route.name !== 'Dashboard') {
                    const getTabTitle = await getTabTitlebyPath(route.path)
                    route.meta.title = getTabTitle || route.meta.title
                    store.dispatch('addTabAction', route)
                }
                activeTabRef.value = route.path
            }
        )

        // click Tab callback
        function handleClickTab(tabItem: any) {
            activeTabRef.value = tabItem.paneName
            const path = tabItem.instance.attrs.fullPath || tabItem.paneName
            go(path)
        }

        // close Tab  callback
        async function handleRemoveTab(targetKey: string) {
            if (unref(unClose)) return
            await store.dispatch('closeTabByKeyAction', targetKey)
            if (targetKey === activeTabRef.value) {
                const latestTab = (store.state as any).tab.visitedTabs.slice(
                    -1
                )[0]
                if (latestTab) {
                    go(latestTab.fullPath || latestTab.path)
                } else {
                    go('/')
                }
            }
        }

        return {
            activeTabRef,
            prefixCls,
            getWrapClass,
            getVisitedTabs,
            handleClickTab,
            handleRemoveTab,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-multiple-tabs';
.#{$prefix-cls} {
    padding: 3px 0;
    align-items: center;
    background: $white;
    box-shadow: 0 1px 2px 0 rgba(29, 35, 41, 0.05);
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .el-tabs--card > .el-tabs__header {
        padding: 0;
        margin: 0;
        border: unset;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        line-height: 30px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
        border: none;
        border-radius: unset;
    }

    .el-tabs__item,
    .el-tabs--card > .el-tabs__header .el-tabs__item:first-child,
    .el-tabs--card > .el-tabs__header .el-tabs__item {
        height: 28px;
        line-height: 28px;
        padding: 0 10px !important;
        border: 1px solid #d9d9d9;
        border-radius: 2px 2px 0 0;
        color: #606266;
        font-weight: 400;
        font-size: 12px;
        margin-left: 5px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        background-color: $primary-color;
        color: $white;
    }
}
</style>
