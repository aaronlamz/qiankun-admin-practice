import store from '@/store'
import { ElMessage } from 'element-plus'
import { getAllUserActionV1 } from '@/services/admin-server-sg'

function strMapToObj(strMap: any) {
    const obj = Object.create(null)
    for (const [k, v] of strMap) {
        obj[k] = v
    }
    return obj
}

function handleAuthList(userActionMap: any) {
    const userAuthList = {} as any
    const authActionList = new Map()
    for (const key in userActionMap) {
        userActionMap[key].forEach((item: any) => {
            authActionList.set(item, true)
        })
        userAuthList[key] = strMapToObj(authActionList)
    }
    return userAuthList
}

export async function getAuthListHandle() {
    try {
        const data: any = await getAllUserActionV1()
        const userAuthList = handleAuthList(data.userActionMap)
        store.dispatch('saveUserAuthListAction', userAuthList)
    } catch (err) {
        ElMessage.error('获取当前用户权限失败')
    }
}
