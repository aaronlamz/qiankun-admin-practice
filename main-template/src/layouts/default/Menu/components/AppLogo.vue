<template lang="pug">
div(:class="getLogoClass")
    img(src="@/assets/images/usmart_logo.png")
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
.#{$prefix-cls} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: $header-height;
    box-sizing: border-box;
    padding: 10px 4px 10px 10px;
    img {
        width: 90%;
        margin: 0 auto;
        display: block;
    }
    .title {
        font-size: 16px;
        color: $white;
        padding-left: 10px;
    }
}
</style>
