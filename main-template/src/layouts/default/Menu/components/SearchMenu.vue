<template lang="pug">
div(:class="getClass")
    el-autocomplete(
        v-model="searchMenu"
        :fetch-suggestions="querySearchAsync"
        placeholder="Search Menu"
        @select="handleSelect"
        )
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useStore } from 'vuex'
import { useGoPage } from '@/hooks/web/usePage'
export default defineComponent({
    name: 'SearchMenu',
    components: {},
    async setup() {
        const store = useStore()
        const go = useGoPage()
        const searchMenu = ref('')
        const filterMenuList = ref([])
        const { prefixCls } = useNamespace('layout-menu-search')
        const getClass = computed(() => {
            return [prefixCls]
        })
        const getFilterMenuList = (list: any) => {
            let arr: any = []
            list.forEach((item: any) => {
                if (item.children) {
                    let itemArr = getFilterMenuList(item.children)
                    arr = arr.concat(itemArr)
                } else {
                    item.value = item.meta.title
                }
                arr.push(item)
            })
            return arr
        }
        store.getters.getFormatMenuList.length === 0 &&
            (await store.dispatch('loginTicketAction'))
        const menuList = store.getters.getFormatMenuList
        filterMenuList.value = getFilterMenuList(menuList)
        const querySearchAsync = (queryString: string, cb: any) => {
            let filterList = []
            queryString = queryString && queryString.toLocaleLowerCase()
            filterList = queryString
                ? filterMenuList.value.filter(
                      (item: any) =>
                          item.meta &&
                          item.meta.title
                              .toLocaleLowerCase()
                              .includes(queryString)
                  )
                : []
            cb(filterList)
        }
        const handleSelect = (item: any) => {
            searchMenu.value = ''
            go(item.path)
        }

        return {
            searchMenu,
            prefixCls,
            getClass,
            handleSelect,
            querySearchAsync,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-layout-menu-search';
.#{$prefix-cls} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-height;
    box-sizing: border-box;
    .title {
        font-size: 16px;
        color: $white;
        padding-left: 10px;
    }
}
</style>
