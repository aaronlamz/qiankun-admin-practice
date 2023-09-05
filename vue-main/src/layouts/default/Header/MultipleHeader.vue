<template lang="pug">
div(:class="getHeaderClass")
    LayoutHeader
    LayoutMultipleTabs
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import LayoutHeader from '@/layouts/default/Header/index.vue'
import LayoutMultipleTabs from '@/layouts/default/Tabs/index.vue'

export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: {
        LayoutHeader,
        LayoutMultipleTabs,
    },
    props: {
        fixed: Boolean,
    },
    setup() {
        const { prefixCls } = useNamespace('layout-multiple-header')
        const getHeaderClass = computed(() => {
            return [prefixCls]
        })
        return { prefixCls, getHeaderClass }
    },
})
</script>
<style lang="scss">
$header-prefix-cls: '#{$namespace}-layout-multiple-header';
.#{$header-prefix-cls} {
    min-width: 1024px;
}
</style>
