<template lang="pug">
.block-el-dropdown
    span.block-user UserName
    ElDropdown(:class="[prefixCls]")
        span.el-dropdown-link
            i(class="el-icon-arrow-down el-icon--right")
        template(#dropdown)
            ElDropdownMenu
                ElDropdownItem(
                    @click="handleMenuClick('modifyPwd')") Modify Password
                ElDropdownItem(
                    @click="handleMenuClick('logout')") Logout
</template>
<script lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { defineComponent } from 'vue'
import headerImg from '@/assets/images/avatar.jpg'
import { useNamespace } from '@/hooks/web/useNamespace'

export default defineComponent({
    name: 'UserDropdown',
    components: {
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
    },
    props: {},
    setup() {
        const { prefixCls } = useNamespace('header-user-dropdown')

        function handleMenuClick(key) {
            switch (key) {
                case 'logout':
                    alert('logout')
                    break
                case 'modifyPwd':
                    alert('modifyPwd')
                    break
            }
        }

        return {
            prefixCls,
            headerImg,
            handleMenuClick,
        }
    },
})
</script>
<style lang="scss">
$prefix-cls: '#{$namespace}-header-user-dropdown';
.#{$prefix-cls} {
    padding-right: 10px;
    cursor: pointer;
}
.block-user {
    position: relative;
    z-index: 999;
    color: #000;
}
</style>
