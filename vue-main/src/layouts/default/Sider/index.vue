<template lang="pug">
ElAside(:class="getSiderClass" :width="`${getSiderWidth}px`")
    Suspense
        LayoutMenu
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElAside } from 'element-plus'
import LayoutMenu from '../Menu/index.vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import { siderSetting } from '@/settings/projectSetting'

export default defineComponent({
    name: 'LayoutSider',
    components: { ElAside, LayoutMenu },
    setup() {
        const { prefixCls } = useNamespace('layout-sider')
        const getSiderClass = computed(() => {
            return [prefixCls]
        })
        const getSiderWidth = computed(() => {
            return siderSetting.width
        })

        return {
            getSiderClass,
            getSiderWidth,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-sider';
.#{$prefix-cls} {
    background-color: $sider-bg-color;
    z-index: 1001;
}
</style>
