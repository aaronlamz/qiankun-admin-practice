<template lang="pug">
ElHeader(:class="getHeaderClass" height="48px")
    div(:class="`${prefixCls}-left`")
        LayoutBreadcrumb
    div(:class="`${prefixCls}-action`")
        //- span.locale-item(
        //-     :class="getActivedLang==='zh_CN'?'actived':''"
        //-     @click="hanlderSwitchLangType('zh_CN')"
        //-     ) 中文 /
        //- span.locale-item(
        //-     :class="getActivedLang==='en'?'actived':''"
        //-     @click="hanlderSwitchLangType('en')"
        //-     ) English
        .client-search-box
            UserTitle
            ClientSearch
        UserDropDown
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ElHeader } from 'element-plus'
import { useNamespace } from '@/hooks/web/useNamespace'
import LayoutBreadcrumb from './components/Breadcrumb.vue'
import UserDropDown from './components/user-dropdown/index.vue'
import ClientSearch from './components/client-search/index.vue'
import UserTitle from './components/user-title/index.vue'
import LS from '@/utils/local-storage/index'
export default defineComponent({
    name: 'LayoutHeader',
    components: {
        ElHeader,
        LayoutBreadcrumb,
        UserDropDown,
        ClientSearch,
        UserTitle,
    },
    methods: {
        hanlderSwitchLangType(val: string) {
            LS.put('lang', val)
            location.reload()
        },
    },
    setup() {
        const { prefixCls } = useNamespace('layout-header')
        const getHeaderClass = computed(() => {
            return [prefixCls]
        })
        const getActivedLang = computed(() => LS.get('lang') || 'en')
        return { prefixCls, getHeaderClass, getActivedLang }
    },
})
</script>
<style lang="scss">
$header-prefix-cls: '#{$namespace}-layout-header';
$header-left-prefix-cls: '#{$namespace}-layout-header-left';
$header-prefix-cls-action: '#{$header-prefix-cls}-action';
.#{$header-prefix-cls} {
    display: flex;
    height: $header-height;
    padding: 0;
    line-height: $header-height;
    color: $white;
    background: $white;
    align-items: center;
    justify-content: space-between;

    .#{$header-left-prefix-cls} {
        display: flex;
        min-width: 250px;
    }
}
.#{$header-prefix-cls-action} {
    display: flex;
    min-width: 750px;
    span {
        font-size: 14px;
        padding: 0 5px;
    }
}
.locale-item {
    color: #ccc;
    cursor: pointer;
    &.actived {
        color: #0960bd;
        font-weight: bold;
    }
}
.client-search-box {
    display: flex;
}
</style>
