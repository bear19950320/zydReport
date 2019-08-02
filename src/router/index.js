import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import inquiry from './modules/inquiry' //  报告解读首页
import selectReport from './modules/selectReport' //  选择报告
import orderList from './modules/orderList' //  我的订单 （订单列表）
import orderDetails from './modules/orderDetails' //  订单支付
import reportExplain from './modules/reportExplain' //  报告解读中
import detailsReport from './modules/detailsReport' //  订单详情
import reportComplete from './modules/reportComplete' //  报告已完成 查看解读详情
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/components/layout'),
    meta: {
      title: '报告解读'
    },
    children: [
      ...inquiry,
      ...selectReport,
      ...orderDetails,
      ...orderList,
      ...reportExplain,
      ...detailsReport,
      ...reportComplete
    ]
  }

]

let router = new Router({ routes: routes })
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    window.localStorage.clear()
    window.sessionStorage.clear()
    store.commit('user/clearUserInfoMutation')
  }
  //   let token = store.getters['user/userGetter']
  // 路由前开启loading
  // console.log(router)
  NProgress.start()
  next()
})
router.afterEach(to => {
  // 完成路由后关闭loading
  NProgress.done()
  if (to.path !== '/login') {
    store.commit('user/historyPathMutation', to.path)
  }
})
export default router
