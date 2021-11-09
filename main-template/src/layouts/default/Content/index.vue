<template lang="pug">
div(:class="[prefixCls]")
    PageLayout
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useContentViewHeight } from './useContentViewHeight'
import PageLayout from '@/layouts/page/index.vue'

export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
        const { prefixCls } = useNamespace('layout-content')
        useContentViewHeight()
        return {
            prefixCls,
        }
    },
})
</script>
<style lang="scss"></style>
