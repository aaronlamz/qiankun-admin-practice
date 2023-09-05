<template lang="pug">
div(:class="prefixCls")
    .title Admin Template Dashboard
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const { prefixCls } = useNamespace('dashboard')
        return { prefixCls }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-dashboard';
.#{$prefix-cls} {
    min-height: 100%;
    background: $white;
    padding: 10px;
    .title {
        font-style: italic;
    }
}
</style>
