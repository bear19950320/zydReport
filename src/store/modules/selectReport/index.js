
const state = {
    activeMenu: '/',
    reportList: []
  }
  const mutations = {
    reportListMutation (state, payload) {
      state.reportList = payload
    }
  }
  const getters = {
    reportListGetter (state) {
      return state.reportList
    }
  }
  const actions = {
  
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  