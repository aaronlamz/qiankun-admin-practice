<template lang="pug">
AppProvider
    RouterView
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppProvider } from '@/components/Application'

export default defineComponent({
    name: 'App',
    components: { AppProvider },
    methods: {},
    setup() {
        return {}
    },
})
</script>
<style lang="scss">
@import '~@/assets/styles/index.scss';
</style>
