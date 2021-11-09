<template lang="pug">
div#subapp-container
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { start } from 'qiankun'
export default defineComponent({
    components: {},
    data() {
        return {}
    },
    mounted() {
        if (!window.qiankunStarted) {
            window.qiankunStarted = true
            start({
                prefetch: 'all',
                sandbox: {
                    strictStyleIsolation: false, // 完全隔离Element组件报错、暂未解决 TODO:https://github.com/umijs/qiankun/issues/634
                    experimentalStyleIsolation: true,
                },
            })
        }
    },
})
</script>
