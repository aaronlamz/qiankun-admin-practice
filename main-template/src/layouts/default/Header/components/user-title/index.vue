<template lang="pug">
.currentUser
    span(style="color:#409EFF") 当前客户：
    span {{clientId}} {{nickName}} {{clientName}}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'userInfoTitle',
    data() {
        return {
            clientId: '',
            nickName: '',
            clientName: '',
        }
    },
    computed: {
        ...mapGetters({
            CLIENT_INFO: 'getClientInfo',
        }),
    },
    watch: {
        CLIENT_INFO(newV) {
            if (newV) {
                this.handleParams(newV)
            } else {
                this.clientId = ''
                this.nickName = ''
                this.clientName = ''
            }
        },
    },
    created() {
        this.handleParams(this.CLIENT_INFO)
    },
    methods: {
        handleParams(value) {
            if (value) {
                this.clientId = value.userId
                this.nickName = value.nickname
                this.clientName = value.customerName
            }
        },
    },
}
</script>

<style scoped>
.currentUser {
    font-size: 16px;
    font-weight: bold;
}
</style>
