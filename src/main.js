import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import vueWechatTitle from 'vue-wechat-title'
import store from '@/store'
import '@/plugins/themes/element-variables.scss'
import '@/assets/scss/reset.scss'
import '@/assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
// import '@/plugins/components.js' // 自定义组件

// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

// Vue.use(Viewer)
// Viewer.setDefaults({
//   Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
// })
let moment = require('moment');

 console.log(moment(new Date()).format('YYYY年MM月DD日')) //  moment 时间转换
Vue.use(vueWechatTitle)
Vue.use(ElementUI)
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
