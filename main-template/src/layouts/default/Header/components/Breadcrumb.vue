<template lang="pug">
div(:class="[prefixCls]")
    ElBreadcrumb
        ElBreadcrumbItem(v-for="item in routes" :key="item.path") {{item.meta.title}}
</template>
<script lang="ts">
import { defineComponent, toRaw, ref, watchEffect } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useRouter } from 'vue-router'
import { useNamespace } from '@/hooks/web/useNamespace'
import { getTitleByPath } from '@/layouts/default/Tabs/useTabs'

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
            const getRouteTitle = getTitleByPath(currentRoute.value?.path)
            if (!matched || matched.length === 0) return
            let breadcrumbList = toRaw(matched)
            breadcrumbList.forEach((item) => {
                if (item.name !== 'Home') {
                    item.meta.title = getRouteTitle || item.meta.title
                }
            })
            routes.value = breadcrumbList
        })

        return {
            routes,
            prefixCls,
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
