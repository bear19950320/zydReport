// import { login, logout } from '@/https/api'
// import router from '@/router'

// import { Message } from 'element-ui'

const state = {
  activeMenu: '/',
  activeTitle: '',
}
const mutations = {
  activeBaseMutation (state, payload) {
    state.activeMenu = payload
  },
  activeTitleMutation (state, payload) {
    state.activeTitle = payload
  },
}
const getters = {
  activeMenuGetter (state) {
    return state.activeMenu
  },
  activeTitleGetter (state) {
    return state.activeTitle
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
