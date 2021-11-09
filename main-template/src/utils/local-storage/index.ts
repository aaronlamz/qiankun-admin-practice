/**
 * 使用 html5 提供的 localStorage来缓存数据
 **/
// import CircularJSON from 'circular-json'
const SPLIT_STR = '@'
const localStorage = window.localStorage

const DATA_PROCESS_MAPPING = {
    number: {
        save: (data: any) => data,
        parse: (data: any) => Number.parseFloat(data),
    },
    boolean: {
        save: (data: any) => data,
        parse: (data: any) => JSON.parse(data),
    },
    object: {
        save: (data: any) => JSON.stringify(data),
        parse: (data: any) => JSON.parse(data),
    },
    default: {
        save: (data: any) => data,
        parse: (data: any) => data,
    },
}

function getProcess(type: string) {
    return (
        (DATA_PROCESS_MAPPING as any)[type] || DATA_PROCESS_MAPPING['default']
    )
}

export default {
    get(key: any) {
        try {
            const stringData = localStorage.getItem(key)
            if (stringData) {
                const dataArray = stringData.split('@')
                let data
                const now = Date.now()
                const time = Number(dataArray[2])
                if (dataArray.length > 2 && time < now) {
                    // 缓存过期
                    localStorage.removeItem(key)
                    return null
                } else {
                    const value = decodeURIComponent(dataArray[1])
                    data = getProcess(dataArray[0]).parse(value)
                    return data
                }
            }
        } catch (e) {
            throw new Error()
        }
        return null
    },
    put(key: string, value: any, expired?: any) {
        // expired 过期时间 单位天 默认是100 上线测试没问题替换旧的设值
        const type = typeof value
        const process = getProcess(type)
        value = type + SPLIT_STR + encodeURIComponent(process.save(value))
        if (expired) {
            // 默认不传 不过期
            const time = expired * 24 * 60 * 60 * 1000 + new Date().getTime()
            value += SPLIT_STR + time
        }
        localStorage.setItem(key, value)
    },
    clear() {
        localStorage.clear()
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
}
