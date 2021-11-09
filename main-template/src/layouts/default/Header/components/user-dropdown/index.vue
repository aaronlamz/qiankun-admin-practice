<template lang="pug">
.block-el-dropdown
    span.block-user {{ getUserInfo.realName }}
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
import { defineComponent, computed } from 'vue'
import headerImg from '@/assets/images/avatar.jpg'
import { useNamespace } from '@/hooks/web/useNamespace'
import { useStore } from 'vuex'
import router from '@/router/index'

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
        const store = useStore()
        const getUserInfo = computed(() => {
            return { realName: store.getters.getUserInfo.nickName }
        })

        function handleLogOut() {
            store.dispatch('logoutAction')
        }
        function handleModifyPwd() {
            router.push({
                path: `/subapp-admin/modify-pwd`,
            })
        }
        function handleMenuClick(key) {
            switch (key) {
                case 'logout':
                    handleLogOut()
                    break
                case 'modifyPwd':
                    handleModifyPwd()
                    break
            }
        }

        return {
            prefixCls,
            getUserInfo,
            handleMenuClick,
            headerImg,
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
