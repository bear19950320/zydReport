import { stat } from "fs";

// 记录订单的所有的数据

const state = {
    myReportprimaryKey: '',
    material: {}, //  首页填写信息
    primaryKeyList: '', //  选择报表的唯一标识
  }
  const mutations = {
    myReportprimaryKeyMutation (state, payload) {
      state.myReportprimaryKey = payload
    },
    materialMutation (state , payload) {
      state.material = payload
    },
    primaryKeyListMutation (state, payload) {
      state.primaryKeyList = payload
    }
  }
  const getters = {
    myReportprimaryKeyGetter (state) {
      return state.myReportprimaryKey
    },
    materialGetter (state) {
      return state.material
    },
    primaryKeyListGetter (state) {
      return state.material
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
  