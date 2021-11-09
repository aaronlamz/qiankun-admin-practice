import type { RouteLocationRaw } from 'vue-router'
import { isString } from '@/utils/is'
import router from '@/router'

export function useGoPage() {
    const { push, replace } = router
    function go(opt: any, isReplace = false) {
        if (!opt) return
        if (isString(opt)) {
            isReplace ? replace(opt) : push(opt)
        } else {
            const o = opt as RouteLocationRaw
            isReplace ? replace(o) : push(o)
        }
    }
    return go
}
