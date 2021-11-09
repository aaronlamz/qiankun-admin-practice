const ORIGIN = `${location.origin}/`

const IS_LOCAL_DEV =
    (location.port && location.port !== '80') ||
    location.host.indexOf('localhost') === 0 ||
    location.host.indexOf('10.210') > -1 ||
    location.host.indexOf('dev.junscript') > -1
const IS_DEV = location.host.indexOf('admin-dev.') === 0
const IS_SIT = location.host.indexOf('admin-sit.') === 0
const IS_SIT1 = location.host.indexOf('admin1-sit.') === 0
const IS_UAT =
    location.host.indexOf('admin-uat.') === 0 ||
    location.host.indexOf('usmartclient-uat.') === 0
const IS_UAT1 =
    location.host.indexOf('admin1-uat.') === 0 ||
    location.host.indexOf('usmartclient1-uat.') === 0
const IS_PRO =
    location.host.indexOf('admin.') === 0 ||
    location.host.indexOf('usmartclient.') === 0

const ENVMap = {
    DEV: IS_DEV,
    LOCAL: IS_LOCAL_DEV,
    SIT: IS_SIT,
    SIT1: IS_SIT1,
    UAT: IS_UAT,
    UAT1: IS_UAT1,
    PRO: IS_PRO,
}
export const ENV = (() => {
    for (const i in ENVMap) {
        if ((ENVMap as any)[i]) {
            return i
        }
    }
    return 'DEV'
})()
const BUCKETMap = {
    dev: IS_LOCAL_DEV || IS_DEV,
    sit: IS_SIT || IS_SIT1,
    uat: IS_UAT || IS_UAT1,
    prd: IS_PRO,
}
export const BUCKET_ENV = (() => {
    for (const i in BUCKETMap) {
        if ((BUCKETMap as any)[i]) {
            return i
        }
    }
    return 'dev'
})()
const UPLOAD_PATH = '/news-upload/api/v1/file'
const sensorsUrl_test = 'http://10.55.4.19:8106/sa?project=default'
const sensorsUrl_pro = 'https://sc.yxzq.com/sa?project=default'
const MAP_API = {
    LOCAL: {
        JY: ORIGIN,
        HZ: ORIGIN,
        UP: location.origin + UPLOAD_PATH,
        overSeaUpload: ORIGIN,
        MH: 'http://m-dev.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN: '//localhost:8087/',
        SUBAPP_SECURITIES: '//localhost:8081/',
        SUBAPP_CAPITAL_SG: '//localhost:8088/',
        SUBAPP_ACCOUNT: '//localhost:8090/',
    },
    DEV: {
        JY: 'http://jy-dev.yxzq.com/',
        HZ: 'http://hz-dev.yxzq.com/',
        UP: 'http://hz-dev.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'http://129.226.52.67:9008/',
        MH: 'http://m-dev.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN:
            'http://usmartclient-dev.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'http://usmartclient-dev.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_ACCOUNT:
            'http://usmartclient-dev.usmartsg.com/admin/subapp-account/index.html',
    },
    SIT: {
        JY: 'http://jy-sit.yxzq.com/',
        HZ: 'http://hz-sit.yxzq.com/',
        UP: 'http://hz-sit.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'http://129.226.52.67:9008/',
        MH: 'http://m-sit.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_ACCOUNT:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-account/index.html',
    },
    SIT1: {
        JY: 'http://jy1-sit.yxzq.com/',
        HZ: 'http://hz1-sit.yxzq.com/',
        UP: 'http://hz1-sit.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'http://129.226.52.67:9008/',
        MH: 'http://m1-sit.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_ACCOUNT:
            'http://usmartclient-sit.usmartsg.com/admin/subapp-account/index.html',
    },
    UAT: {
        JY: 'http://jy-uat.yxzq.com/',
        HZ: 'http://hz-uat.usmartglobal.com',
        UP: 'http://hz-uat.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'http://129.226.52.67:9008/',
        MH: 'http://m-uat.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_CAPITAL_SG:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-capital-sg/index.html',
        SUBAPP_ACCOUNT:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-account/index.html',
    },
    UAT1: {
        JY: 'https://jy1-uat.yxzq.com/',
        HZ: 'http://hz-uat.usmartglobal.com',
        UP: 'https://hz1-uat.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'http://129.226.52.67:9008/',
        MH: 'http://m1-uat.yxzq.com/',
        LOGIN: 'http://10.210.130.17:8080/login',
        LOGOUT: 'http://10.210.130.17:8080/logout',
        sensorsServerUrl: sensorsUrl_test,
        SUBAPP_ADMIN:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_ACCOUNT:
            'http://usmartclient-uat.usmartsg.com/admin/subapp-account/index.html',
    },
    PRO: {
        JY: 'https://jy.yxzq.com/',
        HZ: 'https://hz.usmartglobal.com',
        UP: 'https://hz.yxzq.com' + UPLOAD_PATH,
        overSeaUpload: 'https://v2uploader.usmartsecurities.com/',
        MH: 'https://m.yxzq.com/',
        LOGIN: 'https://sso.yxzq.com/login',
        LOGOUT: 'https://sso.yxzq.com/logout',
        sensorsServerUrl: sensorsUrl_pro,
        SUBAPP_ADMIN:
            'https://usmartclient.usmartsg.com/admin/subapp-admin/index.html',
        SUBAPP_SECURITIES:
            'https://usmartclient.usmartsg.com/admin/subapp-securities/index.html',
        SUBAPP_ACCOUNT:
            'https://usmartclient.usmartsg.com/admin/subapp-account/index.html',
    },
}

export const API_BASE_URL = (MAP_API as any)[ENV]

export default {
    IS_LOCAL_DEV,
    IS_DEV,
    IS_SIT,
    IS_SIT1,
    IS_UAT,
    IS_UAT1,
    IS_PRO,
    API_BASE_URL,
    ENV,
    BUCKET_ENV,
}
