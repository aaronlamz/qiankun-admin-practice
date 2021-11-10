<template lang="pug">
ElHeader(:class="getHeaderClass" height="48px")
    div(:class="`${prefixCls}-left`")
        LayoutBreadcrumb
    div(:class="`${prefixCls}-action`")
        UserDropDown
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElHeader } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import LayoutBreadcrumb from './components/Breadcrumb.vue'
import UserDropDown from './components/user-dropdown/index.vue'
export default defineComponent({
    name: 'LayoutHeader',
    components: {
        ElHeader,
        LayoutBreadcrumb,
        UserDropDown,
    },
    setup() {
        const { prefixCls } = useNamespace('layout-header')
        const getHeaderClass = computed(() => {
            return [prefixCls]
        })
        return { prefixCls, getHeaderClass }
    },
})
</script>
<style lang="scss">
$header-prefix-cls: '#{$namespace}-layout-header';
$header-left-prefix-cls: '#{$namespace}-layout-header-left';
$header-prefix-cls-action: '#{$header-prefix-cls}-action';
.#{$header-prefix-cls} {
    display: flex;
    height: $header-height;
    padding: 0;
    line-height: $header-height;
    color: $white;
    background: $white;
    align-items: center;
    justify-content: space-between;

    .#{$header-left-prefix-cls} {
        display: flex;
        min-width: 250px;
    }
}
.#{$header-prefix-cls-action} {
    display: flex;
    min-width: 750px;
    span {
        font-size: 14px;
        padding: 0 5px;
    }
}
.locale-item {
    color: #ccc;
    cursor: pointer;
    &.actived {
        color: #0960bd;
        font-weight: bold;
    }
}
</style>
