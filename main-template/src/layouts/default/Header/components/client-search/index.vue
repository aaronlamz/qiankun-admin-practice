<template>
    <section class="clientSearch">
        <el-autocomplete
            class="input-with-select"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入"
            :trigger-on-focus="false"
            @select="selectHandle"
            clearable
        >
            <template #prepend>
                <el-select v-model="selectValue" placeholder="请选择">
                    <el-option label="客户 ID" value="userId"></el-option>
                    <el-option label="手机号码" value="phoneNumber"></el-option>
                    <el-option
                        label="客户姓名拼音"
                        value="spellName"
                    ></el-option>
                    <el-option
                        label="客户姓名汉字"
                        value="customerName"
                    ></el-option>
                    <el-option label="邮箱" value="email"></el-option>
                    <el-option label="资金账号" value="fundAccount"></el-option>
                </el-select>
            </template>
        </el-autocomplete>
        <el-button icon="el-icon-refresh" type="primary" @click="resetHandle"
            >重置</el-button
        >
    </section>
</template>

<script>
import { userIdentifyInfoV2 } from '@/services/user-admin-server-dolphin'
import { mapActions } from 'vuex'
import { debounce } from 'lodash'
export default {
    name: 'clientSearch',
    data() {
        return {
            inputValue: '',
            selectValue: 'userId',
        }
    },
    methods: {
        ...mapActions(['saveClientInfoAction']),
        querySearch: debounce(async function (queryString, cb) {
            let params = {}
            let result = []
            params[this.selectValue] = queryString
            params.total = 10
            try {
                let data = await userIdentifyInfoV2(params)
                data.forEach((item) => {
                    if (item.userId) {
                        result.push({
                            value:
                                item.customerName +
                                ' ' +
                                this.handlePhone(item.phoneNumber) +
                                ' ' +
                                this.handleEmail(item.email) +
                                ' ' +
                                item.userId,
                            clientInfo: item,
                        })
                    }
                })
                cb(result)
            } catch (err) {
                this.$message.error(err || '请输入正确的参数')
            }
        }, 1000),
        resetHandle() {
            this.inputValue = ''
            this.saveClientInfoAction(null)
            this.$router.push({
                path: '/subapp-account/customer-details',
                params: { userId: null },
            })
        },
        selectHandle(value) {
            this.saveClientInfoAction(value.clientInfo)
            this.$router.push({
                path: '/subapp-account/customer-details',
                params: {
                    userId: value.clientInfo.userId,
                    uuid: value.clientInfo.uuid,
                },
            })
        },
        handleEmail(email) {
            if (email) {
                let emailArr = email.split('@')
                let prefix = emailArr[0]
                if (prefix.length > 6) {
                    let hidePrefix = prefix.replace(
                        /(\w{3})(\w+)(\w{3})\b/g,
                        ($0, $1, $2, $3) => {
                            let arr = []
                            for (let i = 0; i < $2.length; i++) {
                                arr.push('*')
                            }
                            return $1 + arr.join('') + $3
                        }
                    )
                    return hidePrefix + '@' + emailArr[1]
                } else {
                    return email
                }
            }
            return ''
        },
        handlePhone(number) {
            if (number) {
                let num = number
                    .toString()
                    .replace(/(\d{3})\d{4}(\d{4})/g, ($0, $1, $2) => {
                        return $1 + '****' + $2
                    })
                return num
            }
            return ''
        },
    },
}
</script>

<style lang="scss">
.clientSearch {
    // width: 580px;
    .el-input-group {
        width: 480px;
    }
    .el-select {
        width: 150px;
    }
}
</style>
