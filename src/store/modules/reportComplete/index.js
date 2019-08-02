
const state = {
    reportCompltet: []
  }
  const mutations = {
    reportCompltetMutation (state, payload) {
      state.reportCompltet = payload
    }
  }
  const getters = {
    reportCompltetGetter (state) {
      return state.reportCompltet
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
  