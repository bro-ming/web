# web
websocket前端封装-留个纪念，自己使用

另外服务端键仓库c

#### 使用举例

```js

import { InitSocket, sendWSPush, onmessageWS, oncloseWS, onerrorWS } from '@/libs/ws'

created() {

    // websocket 连接
    if (InitSocket()) {
            
        // 读取消息，渲染数据到页面
        if (!(onmessageWS() === null)) {
          this.msgHandle(onmessageWS())
        }
    }
    
    // 消息发送
    var msg = 'Hello Word'
    sendWSPush(msg)
    
    // 状态监听，短线重连
    this.listenConn()
    
    // 主动断开
    oncloseWS()
}

methods: {
    msgHandle (msg) {
      console.log('ws msg is:', msg)
    }
    
    listenConn () {
      setInterval(function () {
        onerrorWS()
      }, 1000)
    }
}
```