<template>
    <div :class="`${prefixCls}__info`">
        <span class="ml-1">{{ getTitle }}</span>
    </div>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { TabContentEnum } from '../types'
import { useNamespace } from '@/hooks/web/useNamespace'
import { RouteLocationNormalized } from 'vue-router'

export default defineComponent({
    name: 'TabContent',
    props: {
        tabItem: {
            type: Object as PropType<RouteLocationNormalized>,
            default: null,
        },
        type: {
            type: Number as PropType<TabContentEnum>,
            default: TabContentEnum.TAB_TYPE,
        },
    },
    setup(props) {
        const { prefixCls } = useNamespace('multiple-tabs-content')
        const getTitle = computed(() => {
            const { tabItem: { meta } = {} } = props
            return meta && meta.title
        })
        return {
            prefixCls,
            getTitle,
        }
    },
})
</script>
