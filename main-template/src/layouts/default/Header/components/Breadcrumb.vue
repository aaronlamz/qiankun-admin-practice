<template lang="pug">
div(:class="[prefixCls]")
    ElBreadcrumb
        ElBreadcrumbItem(v-for="item in routes" :key="item.path") {{item.meta.title}}
</template>
<script lang="ts">
// import type { RouteLocationMatched } from 'vue-router'
import { defineComponent, toRaw, ref, watchEffect } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useRouter } from 'vue-router'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useGoPage } from '@/hooks/web/usePage'
import { getTabTitlebyPath } from '@/layouts/default/Tabs/useTabs'

export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { ElBreadcrumb, ElBreadcrumbItem },
    props: {},
    setup() {
        let routes = ref<any>([])
        const { currentRoute } = useRouter()
        const { prefixCls } = useNamespace('layout-breadcrumb')
        watchEffect(async () => {
            const matched = currentRoute.value?.matched
            const getRouteTitle = await getTabTitlebyPath(
                currentRoute.value?.path
            )
            if (!matched || matched.length === 0) return
            let breadcrumbList = toRaw(matched)
            breadcrumbList.forEach((item) => {
                if (item.name !== 'Home') {
                    item.meta.title = getRouteTitle || item.meta.title
                }
            })
            routes.value = breadcrumbList
        })

        function handleClick(paths: string[], e: Event) {
            e?.preventDefault()
            const go = useGoPage()
            const ps = paths.slice(1)
            const lastPath = ps.pop() || ''
            const parentPath = paths[0] || ''
            let path = `${parentPath}/${lastPath}`
            path = /^\//.test(path) ? path : `/${path}`
            if (path.indexOf('framework') !== -1) return
            go(path)
        }

        return {
            routes,
            prefixCls,
            handleClick,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-breadcrumb';
.#{$prefix-cls} {
    padding: 10px;
}
</style>
