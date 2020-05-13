import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

util.getShapeName = function (clazz) {
  switch (clazz) {
    case 'start': return 'start-node'
    case 'end': return 'end-node'
    case 'gateway': return 'gateway-node'
    case 'exclusiveGateway': return 'exclusive-gateway-node'
    case 'parallelGateway': return 'parallel-gateway-node'
    case 'inclusiveGateway': return 'inclusive-gateway-node'
    case 'timerStart': return 'timer-start-node'
    case 'messageStart': return 'message-start-node'
    case 'signalStart': return 'signal-start-node'
    case 'userTask': return 'user-task-node'
    case 'scriptTask': return 'script-task-node'
    case 'mailTask': return 'mail-task-node'
    case 'javaTask': return 'java-task-node'
    case 'receiveTask': return 'receive-task-node'
    case 'timerCatch': return 'timer-catch-node'
    case 'messageCatch': return 'message-catch-node'
    case 'signalCatch': return 'signal-catch-node'
    case 'draft': return 'draft-node'
    case 'autoBranch': return 'auto-branch-node'
    default: return 'task-node'
  }
}

export default util
