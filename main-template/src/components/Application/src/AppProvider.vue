<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import { createAppProviderContext } from './useAppContext'
import themeSetting from '@/settings/themeSetting'

export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
        prefixCls: {
            type: String as PropType<string>,
            default: themeSetting.prefixCls,
        },
    },
    setup(props, { slots }) {
        const { prefixCls } = toRefs(props)
        createAppProviderContext({ prefixCls })
        return () => slots.default?.()
    },
})
</script>
