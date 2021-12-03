<template lang="pug">
h1(style="padding:20px;text-align:center;") subapp {{$route.name}}
    .content
        p Subapp Page MainStore Count: {{parentCount}}
        p menu-2 page Count: {{count}}
        p
            button(@click="addParentCount") AddParentCount
        p
            button(@click="addCount") addCount
</template>
<script>
export default {
    components: {},
    data() {
        return {
            count: 0
        }
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
        addCount() {
            this.count++
        }
    }
}
</script>
<style lang="scss" scoped></style>
