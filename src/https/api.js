import http from '@/plugins/axios.js'
// 服务端地址
// 在对应页面import {login} from "@/https/api"
export const InitOpenidController = (para) => http.post('/InitOpenidController', para)     //   获取微信的openId
export const GetReportList = (para) => http.get('/listSecondReport', para)  //   获取报告解读的报告列表
export const CommitReportInterpret = (para) => http.get('/commitFSKReportInterpretOrder', para)  //   提交订单
export const GetOrderListByOpenId = (para) => http.get('/getFSKReportInterpretOrderListByOpenId', para)  //   获取报告解读订单列表


export const GetReportOssAddress = (para) => http.post('/getReportOssAddressByPrimaryKey', para)  //   我的报告 里面获取 全亮影像 和 胶片

// export const login = (para) => http.get('/login', para)
// export const getTableData = (para) => http.post('/investigate/query/page', para) // 获取table数据
// export const getReportTableData = (para) => http.post('/investigate/query/statics/list', para) // 获取统计页表单数据
// export const getReportData = () => http.post('/investigate/query/statics') // 获取统计数据
// export const getDetailData = (para) => http.post('/investigate/query/list', para) // 获取详情数据
// // 单个 接收 1 /退回 3 state: 1/3,applyFileId: 数据id,returnReason: 退回理由
// export const changeState = (para) => http.post('/investigate/update/state', para)
// // state: 1,applyFileIds: '[' + idsArr.join(',') + ']',returnReason: refuse_reson
// export const changeMutiState = (para) => http.post('/investigate/batch/update/state', para)
// export const logout = () => http.post('/logout')
