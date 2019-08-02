import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import system from './modules/system'
import orderStore from './modules/orderStore'
import selectReport from './modules/selectReport' //  选择报表的时候进入详情后返回记住他的状态和 支付界面的list
import commitOrder from './modules/commitOrder'// 提交订单的状态 和 选择订单时候点击进入详情记住的 报告唯一ID 
import reportCompltet from './modules/reportComplete'// 查看解读报告的集合
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    system,
    orderStore,
    commitOrder,
    selectReport,
    reportCompltet
  },
  plugins: [
    createPersistedState({
      reducer (val) {
        return {
          user: val.user, // 持久化存储 user数据
          system: val.system,
          orderStore: val.orderStore,
          commitOrder: val.commitOrder,
          selectReport: val.commitOrder,
        }
      }
    })
  ]
})
