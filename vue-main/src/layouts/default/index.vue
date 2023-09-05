<template lang="pug">
ElContainer(:class="prefixCls")
    LayoutSider
    ElContainer(:class="`${prefixCls}__layout-main`")
        LayoutMultipleHeader
        ElMain(:class="`${prefixCls}__main`")
            LayoutContent
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElMain } from 'element-plus'
import LayoutMultipleHeader from './Header/MultipleHeader.vue'
import LayoutContent from './Content/index.vue'
import LayoutSider from './Sider/index.vue'
import { useNamespace } from '@/hooks/web/useNamespace'

export default defineComponent({
    name: 'DefaultLayout',
    components: {
        ElContainer,
        ElHeader,
        ElMain,
        LayoutMultipleHeader,
        LayoutContent,
        LayoutSider,
    },
    setup() {
        const { prefixCls } = useNamespace('default-layout')
        return { prefixCls }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-default-layout';
$prefix-cls-layout-main: '#{$namespace}-default-layout__layout-main';
$prefix-cls-main: '#{$namespace}-default-layout__main';
.#{$prefix-cls} {
    width: 100%;
    min-height: 100%;
    background: $white;
}

.#{$prefix-cls-layout-main} {
    display: block;
    overflow: auto;
}

.#{$prefix-cls-main} {
    padding: 0;
    margin: 0;
    min-width: 1024px;
}
</style>
