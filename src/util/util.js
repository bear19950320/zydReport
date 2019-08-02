/**
 * 生产随机字符
 * @param {*} len 随机数长度
 */
export function randomString (len) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return (new Date().getTime() + '').substr(0, 10) + pwd
}
// import {randomString} from '@/util/util.js'--------引入 randomString(8)------调用
