import validator from 'validator'
export function getParam(name: string, path?: any) {
    const reg = new RegExp('(^|&|\\?|#)' + name + '=([^&]*?)(&|#|$)')
    let url = path || location.href
    const tempHash = url.match(/#.*/) ? url.match(/#.*/)[0] : ''
    url = url.replace(/#.*/, '')
    if (reg.test(tempHash)) {
        return decodeURIComponent(tempHash.match(reg)[2])
    } else if (reg.test(url)) {
        return decodeURIComponent(url.match(reg)[2])
    } else return ''
}

// 校验手机号
export function checkPhoneNum(str: string) {
    return str && validator.isMobilePhone(str.toString(), 'zh-CN')
}

// 校验邮箱
export function checkEmail(str) {
    // const reg = /^w+[w-]*([.][w-]+)*@w+([-.]w+)*.w+([-.]w+)*$/
    return str && validator.isEmail(str)
    // return str && reg.test(str)
}
