import { getParam } from '@/utils/tools'
import LS from '@/utils/local-storage'
import {
    loginV1,
    logoutCleanV1,
    getCurrentUserV1,
} from '@/services/admin-server-sg'
import { useFormatMenuList } from '@/layouts/default/Menu/useMenu'
import { ElMessageBox, ElMessage } from 'element-plus'

interface State {
    userAuthList: Array<any>
    menuList: Array<any>
    userInfo: Obj<any>
    clientInfo: Obj<any>
    token: string
    firstLogin: Boolean
}

export default {
    state: {
        userAuthList: [],
        menuList: [],
        userInfo: {},
        clientInfo: {},
        token: '',
        firstLogin: false,
    },
    mutations: {
        commitSetUserInfo(state: State, userInfo: any) {
            state.userInfo = userInfo
        },
        commitSetFirstLogin(state: State, firstLogin: Boolean) {
            state.firstLogin = firstLogin
        },
        commitCleanFirstLogin(state: State) {
            state.firstLogin = false
        },
        commitSetToken(state: State, token: string) {
            state.token = token
            LS.put('SG-TOKEN', token)
        },
        commitCleanToken(state: State) {
            state.token = ''
            LS.remove('SG-TOKEN')
            LS.remove('counterId')
            LS.remove('nickName')
        },
        commitSetMenuList(state: State, menuList: any) {
            state.menuList = menuList
        },
        commitGoLogin() {
            location.href = `${
                window.location.origin + window.location.pathname + '#/login'
            }?service=${encodeURIComponent(window.location.href)}`
        },

        commitSaveUserAuthList(state: State, userAuthList: Array<string>) {
            state.userAuthList = userAuthList
        },
        commitSaveClientInfo(state: State, clientInfo: any) {
            state.clientInfo = clientInfo
        },
    },
    actions: {
        goLoginAction({ commit }: any) {
            commit('commitCleanToken')
            commit('commitGoLogin')
        },
        async loginTicketAction({ commit }: any, payload: any) {
            const counterId = (payload && payload.counterId) || ''
            const password = (payload && payload.password) || ''

            const params = {
                counterId: counterId,
                password: password,
            }
            const redirect = getParam('service')
            /** cancel
             *  @description 登录逻辑：
             *  1、拿到账号密码后先调用登录接口，拿到token后再跳转页面，把token存到内存中====>接口用于判断登录
             *  2、有token==>通过getCurrentUserV接口获取菜单信息、用户信息，同事获取权限信息，不满足条件返回登录
             *  3、账号密码错误弹框提醒，重载页面
             *  4、当浏览器未登陆过账户时token为空跳转到登录页
             *  5、登出账户时，把当前的url作为参数存到url中，再次登陆时截取之前的地址跳转
             */
            if (params.counterId && params.password) {
                try {
                    const res = await loginV1(params)
                    if ((res as any).token) {
                        // 判断是否为首次登录,首次登录需要更改密码后再登录
                        const isFirstLogin = (res as any).firstLogin
                        commit('commitSetFirstLogin', isFirstLogin)
                        commit('commitSetToken', (res as any).token)
                        // 存放用户名和用户登录ID，供修改密码时使用
                        LS.put('nickName', (res as any).userNameVO.nickName)
                        LS.put('counterId', counterId)
                        if (!isFirstLogin) {
                            getAuthListHandle()
                            window.location.replace(redirect)
                            window.location.reload()
                        }
                    }
                } catch (e) {
                    if ([110038, 110010].includes((e as any).code)) {
                        ElMessageBox.alert((e as any).msg, 'Tips', {
                            confirmButtonText: 'Confirm',
                            callback: () => {
                                ElMessage({
                                    type: 'info',
                                    message: `请重新登录`,
                                })
                            },
                        })
                    }
                }
            } else if (LS.get('SG-TOKEN')) {
                const res = await getCurrentUserV1()
                commit('commitSetUserInfo', (res as any).userNameVO)
                commit('commitSetMenuList', (res as any).menuSelectVoList)
                getAuthListHandle()
            } else if (!location.hash.includes('#/login?')) {
                // 和之前跳转集团统一登录页不同，本项目只有一个登录页，所以判断Hash值包含#/login?字段就不再跳转
                commit('commitGoLogin')
            }
        },
        async logoutAction({ commit }: any) {
            try {
                await logoutCleanV1()
                commit('commitCleanToken')
                commit('commitCleanFirstLogin')
                commit('commitGoLogin')
            } catch (e) {
                throw new Error()
            }
        },
        saveUserAuthListAction({ commit }: any, userAuthList: Array<string>) {
            commit('commitSaveUserAuthList', userAuthList)
        },
        saveClientInfoAction({ commit }: any, clientInfo: any) {
            commit('commitSaveClientInfo', clientInfo)
        },
    },
    getters: {
        getToken(state: State) {
            return state.token || LS.get('SG-TOKEN')
        },
        getUserInfo(state: State) {
            return state.userInfo
        },
        getClientInfo(state: State) {
            return state.clientInfo
        },
        getUserAuthList(state: State) {
            return state.userAuthList
        },
        getMenuList(state: State) {
            return state.menuList
        },
        getFormatMenuList(state: State) {
            return useFormatMenuList(state.menuList)
        },
        getFirstLogin(state: State) {
            return state.firstLogin
        },
    },
}
