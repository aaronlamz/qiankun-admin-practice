<template lang="pug">
div#subapp-vue2-container
div#subapp-vue3-container
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
                    strictStyleIsolation: false,
                    experimentalStyleIsolation: true,
                },
            })
        }
    },
})
</script>
