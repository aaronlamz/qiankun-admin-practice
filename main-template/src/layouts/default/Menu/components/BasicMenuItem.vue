<template lang="pug">
ElMenuItem(:index="item.id")
    BasicMenuItemContent(:item="item")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElMenuItem } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import { itemProps } from '../props'
import BasicMenuItemContent from './BasicMenuItemContent.vue'

export default defineComponent({
    name: 'BasicMenuItem',
    components: { ElMenuItem, BasicMenuItemContent },
    props: itemProps,
    setup() {
        const { prefixCls } = useNamespace('basic-menu-item')
        return {
            prefixCls,
        }
    },
})
</script>
