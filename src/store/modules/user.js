import router from '@/router'

import { Message } from 'element-ui'

// 创建user数据模型

const state = {
  user: {
    token: '',
    userId: '',
    roleId: ''
  }, // 用户信息数据
  historyPath: ''
}
const mutations = {
  // 保存用户信息
  userMutation (state, payload) {
    state.user = payload
    // 记录session 里面是否有地址如果有就跳转到session 地址 没有就跳转报表首页
    // router.push({ path: state.historyPath || 'main/report' })
    // 不使用 session 直接跳转跳转报表首页
    router.push('main/report')
  },
  clearUserInfoMutation (state) {
    localStorage.clear()
    sessionStorage.clear()
    state.user = {
      token: '',
      userId: '',
      roleId: ''
    }
  },
  logOutMutation (state) {
    state.user = {}
    router.push('/login')
  },
  historyPathMutation (state, path) {
    state.historyPath = path
  }
}
const getters = {
  userInfoGetter (state) {
    return state.user
  },
  historyPathGetter (state) {
    return state.historyPath
  }
}
const actions = {
  // 登录
  async loginAction ({ commit }, params) {
    let [data, success] = await login(params)
    if (success) {
      sessionStorage.setItem('loginFlag', 1)
      commit('userMutation', data)
      Message.success('登录成功！')
    }
  },
  async logoutAction ({ commit }) {
    commit('logOutMutation')
    await logout()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
