const state = {
    activeMenu: '/',
    orderStore: '', // (history 我的订单 newOrder 选择报告->新建订单) 控制 ‘报告支付’ 页面的样式展示
    orderStatus: '',  //.. (loading 解读中 end 解读完成 ) 控制 '会诊意见' 页面样式的展示
  }
  const mutations = {
    orderStoreMutation (state, payload) {
      state.orderStore = payload
    },
    orderStatusMutation (state, payload) {
      state.orderStatus = payload
    }
  }
  const getters = {
    orderStoreGetter (state) {
      return state.orderStore
    },
    orderStatusGetter (state) {
      return state.orderStatus
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
  