<template lang="pug">
ElHeader(:class="getHeaderClass" height="48px")
    div(:class="`${prefixCls}-left`")
        LayoutBreadcrumb
    div(:class="`${prefixCls}-action`")
        div(style="padding-right:20px;")
            span Parent Store Count:
            span(style="color:red;font-weight:blod;") {{$store.state.count}}
            button(@click="addCount") AddCount
        UserDropDown
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElHeader } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import LayoutBreadcrumb from './components/Breadcrumb.vue'
import UserDropDown from './components/user-dropdown/index.vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'LayoutHeader',
    components: {
        ElHeader,
        LayoutBreadcrumb,
        UserDropDown,
    },
    setup() {
        const store = useStore()
        const { prefixCls } = useNamespace('layout-header')
        const getHeaderClass = computed(() => {
            return [prefixCls]
        })
        const addCount = () => {
            store.commit('increment')
        }
        return { addCount, prefixCls, getHeaderClass }
    },
})
</script>
<style lang="scss">
$header-prefix-cls: '#{$namespace}-layout-header';
$header-prefix-left: '#{$header-prefix-cls}-left';
$header-prefix-action: '#{$header-prefix-cls}-action';
.#{$header-prefix-cls} {
    display: flex;
    height: $header-height;
    padding: 0;
    line-height: $header-height;
    background: $white;
    align-items: center;
    justify-content: space-between;

    .#{$header-prefix-left} {
        display: flex;
        min-width: 250px;
    }
}
.#{$header-prefix-action} {
    display: flex;
    min-width: 750px;
    justify-content: flex-end;
    span {
        font-size: 14px;
        padding: 0 5px;
    }
}
</style>
