<template lang="pug">
h1(style="padding:20px;text-align:center;") subapp {{$route.name}}
    .content
        p Subapp Page MainStore Count: {{parentCount}}
        p
            button(@click="addParentCount") AddParentCount
</template>
<script>
export default {
    components: {},
    data() {
        return {}
    },
    computed: {
        parentCount() {
            return this.$root.mainStore.state.count
        }
    },
    created() {},
    methods: {
        addParentCount() {
            this.$root.mainStore.commit('increment')
        },
        addChildCount() {}
    }
}
</script>
<style lang="scss" scoped></style>
