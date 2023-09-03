<template lang="pug">
div
    div#subapp-vue2-container(v-show="$route.path.startsWith('/subapp-template-vue2')")
    div#subapp-vue3-container(v-show="$route.path.startsWith('/subapp-template-vue3')")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { start } from 'qiankun'
// import { start, loadMicroApp } from 'qiankun'
// import { apps } from '@/micro/config'

export default defineComponent({
    name: 'PageLayout',
    components: {},
    setup() {
        const isLoaded = {
            subappVue2: false,
            subappVue3: false,
        }

        return { isLoaded }
    },
    watch: {
        // '$route.path': function (newVal) {
        //     // 根据路由路径判断子应用的加载状态并进行相应处理
        //     if (newVal.startsWith('/subapp-template-vue2') && !this.isLoaded.subappVue2) {
        //         this.isLoaded.subappVue2 = true
        //         const subappVue2 = apps.find((item: any) => item.name === 'subapp-template-vue2') || {}
        //         loadMicroApp(subappVue2 as any)  // 使用实际的微应用配置
        //     }
        //     if (newVal.startsWith('/subapp-template-vue3') && !this.isLoaded.subappVue3) {
        //         this.isLoaded.subappVue3 = true
        //         const subappVue3 = apps.find((item: any) => item.name === 'subapp-template-vue3') || {}
        //         loadMicroApp(subappVue3 as any)  // 使用实际的微应用配置
        //     }
        // }
    },
    mounted() {
        // 在这里可以初始化 qiankun
        start({
            singular: false,
        })
    },
})
</script>
