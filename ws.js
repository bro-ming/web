import CryptoJs from '@/libs/util.crypto'

const WS_URL = 'ws://127.0.0.1:8099/ws'
let WsClient = ''
const setIntervalWebsocketPush = null

// 建立连接
export const InitSocket = () => {
  if (!WsClient || WsClient.readyState === 3) {
    console.log('建立websocket连接')
    WsClient = new WebSocket(WS_URL)
    WsClient.onmessage = onmessageWS
    WsClient.onerror = onerrorWS
    WsClient.onclose = oncloseWS
  } else {
    return true
  }
}

// 连接失败重连
export function onerrorWS () {
  if (WsClient !== null && WsClient.readyState === 3) {
    clearInterval(setIntervalWebsocketPush)
    WsClient.close()
    InitSocket()
  }
}

// WS数据接收统一处理
export function onmessageWS (e) {
  // AES解密
  var aesStr = CryptoJs.Decrypt(e.data)
  console.log('服务端来信解密后：', aesStr)

  // 处理公共消息
  return msgHandle(JSON.parse(aesStr))
}

// 发送消息 msg = {op:'',action:'',param:'',data:''}
export function sendWSPush (msg) {
  if (WsClient !== null && WsClient.readyState === 3) {
    WsClient.close()
    // 重连
    InitSocket()
  } else if (WsClient.readyState === 1) {
    WsClient.send(CryptoJs.Encrypt(JSON.stringify(msg)))
  } else if (WsClient.readyState === 0) {
    setTimeout(() => {
      WsClient.send(CryptoJs.Encrypt(JSON.stringify(msg)))
    }, 3000)
  }
}

/** 关闭WS */
export function oncloseWS () {
  clearInterval(setIntervalWebsocketPush)
}

// 公共消息处理
var msgHandle = function (rsMsg) {
  const pushMsg = {
    op: '',
    action: '',
    data: {}
  }

  // 心跳回复
  if (rsMsg.action === 'ping') {
    pushMsg.op = 'rep'
    pushMsg.action = 'pong'
    pushMsg.param = {
      Pong: [rsMsg.data]
    }
    WsClient.send(CryptoJs.Encrypt(JSON.stringify(pushMsg)))
    return null
  }

  // 客户端鉴权
  if (rsMsg.action === 'auth') {
    pushMsg.op = 'rep'
    pushMsg.action = 'login'
    pushMsg.param = {
      userName: '',
      password: '123123'
    }
    WsClient.send(CryptoJs.Encrypt(JSON.stringify(pushMsg)))
    return null
  }

  return rsMsg
}
