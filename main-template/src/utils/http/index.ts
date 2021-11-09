import axios from 'axios'
import qs from 'qs'
import LS from '@/utils/local-storage'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'

const getToken = () => {
    return {
        Authorization: LS.get('SG-TOKEN') || '',
    }
}

export default class BaseRequest {
    private $http
    constructor(baseURL?: string) {
        this.$http = axios.create({
            timeout: 30000,
            baseURL,
        })
        this.$http.interceptors.request.use(async (config) => {
            config.headers = {
                ...config.headers,
                ...getToken(),
            }
            return config
        })
        this.$http.interceptors.response.use(
            (res: any) => {
                if (res.headers['content-type'].includes('application/vnd')) {
                    return Promise.resolve(res)
                }

                if (typeof res.data === 'string') {
                    return res.data
                }

                if (res.data) {
                    // "100006", "员工账号{0}未录入,请联系管理员添加"
                    // "110002", "登录失效,请重新登录"
                    // "110003", "无权限"
                    // "110005", "鉴权参数数量有误"
                    // "110006",登录用户被禁用,请联系管理员解禁
                    // "110007", "token不能为空"
                    // "110008", "服务不可用"
                    if (
                        [110006, 110002, 110003, 100006, 110007].includes(
                            res.data.code
                        )
                    ) {
                        ElMessageBox.alert(res.data.msg, 'Tips', {
                            confirmButtonText: 'Confirm',
                            callback: () => {
                                store.dispatch('goLoginAction')
                            },
                        })
                        return Promise.reject(res.data)
                    } else if (res.data.code === 110003) {
                        return Promise.reject(res.data)
                    } else if (res.data.code !== 0) {
                        ElMessage({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error',
                        })
                        return Promise.reject(res.data)
                    } else {
                        return Promise.resolve(res.data.data)
                    }
                }
            },
            (e) => {
                return Promise.reject(e)
            }
        )
    }
    post(url: string, params = {}, config = {}): Promise<any> {
        return this.$http.post(url, params, config)
    }
    get(url: string, params = {}, config = {}): Promise<any> {
        return this.$http.get(url, {
            params,
            ...config,
        })
    }
    getForm(url: string, params = {}): Promise<any> {
        return this.$http({
            params,
            url,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {},
        })
    }
    del(url: string, params = {}): Promise<any> {
        return this.$http.delete(url, params)
    }
    put(url: string, params = {}, config = {}): Promise<any> {
        return this.$http.put(url, params, config)
    }
    postForm(url: string, params = {}): Promise<any> {
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(params),
        })
    }
    postMul(url: string, params: any): Promise<any> {
        const formData = new FormData()
        Object.keys(params).forEach((key) => {
            formData.append(key, params[key])
        })
        return this.$http({
            url,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        })
    }
}
