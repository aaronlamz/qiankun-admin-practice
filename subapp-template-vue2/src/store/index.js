import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const stores = {
    state,
    mutations,
    getters,
    actions,
    modules: {}
}

export default stores
