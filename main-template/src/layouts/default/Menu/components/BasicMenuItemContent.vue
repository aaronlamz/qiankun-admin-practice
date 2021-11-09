<template lang="pug">
//- el-tooltip(
//-     class="item"
//-     effect="dark"
//-     :content="getMenuName"
//-     placement="right")
div
    span.noselect(
        :class="`${prefixCls}-wrapper`"
        :title="getMenuName") 
        i(:class="`icon iconfont ${getMenuIcon}`") {{ getMenuName }}
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import { contentProps } from '../props'

export default defineComponent({
    name: 'BasicMenuItemContent',
    components: {},
    props: contentProps,
    setup(props) {
        const { prefixCls } = useNamespace('basic-menu-item-content')
        const getMenuName = computed(() => props.item?.meta.title)
        const getMenuIcon = computed(() => props.item?.meta.icon)

        return {
            prefixCls,
            getMenuName,
            getMenuIcon,
        }
    },
})
</script>
<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-basic-menu-item-content';
.#{$prefix-cls}-wrapper {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
