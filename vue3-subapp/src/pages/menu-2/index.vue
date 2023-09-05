<template lang="pug">
h1(style="padding:20px;text-align:center;") subapp-vue3 {{$route.name}}
    .content
        p
            span Vue3 Parent Store Count:
            span(style="color:red;font-weight:blod;") {{parentCount}}
        p
            span Vue3 {{$route.name}} page Count:
            span(style="color:red;font-weight:blod;") {{count}}
        p
            button(@click="addParentCount") AddParentCount
        p
            button(@click="addCount") AddPageCount
</template>
<script>
export default {
  components: {},
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    parentCount() {
      return this.$root.mainStore.state.count;
    },
  },
  created() {},
  methods: {
    addParentCount() {
      this.$root.mainStore.commit("increment");
    },
    addCount() {
      this.count++;
    },
  },
};
</script>
<style lang="scss" scoped></style>
