<template lang="pug">
div(:class="getLogoClass")
    div(:class="`${getLogoClass}__body`")
        img(src="@/assets/images/element-plus-logo.svg")
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'
export default defineComponent({
    name: 'AppLogo',
    components: {},
    setup() {
        const { prefixCls } = useNamespace('layout-menu-logo')
        const getLogoClass = computed(() => {
            return [prefixCls]
        })
        return { prefixCls, getLogoClass }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-menu-logo';
$prefix-cls-body: '#{$namespace}-layout-menu-logo__body';

.#{$prefix-cls} {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #26282a;
}
.#{$prefix-cls-body} {
    img {
        display: block;
        height: 30px;
    }
}
</style>
