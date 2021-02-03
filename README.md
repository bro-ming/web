# web
websocket前端封装-方便使用

#### 使用说明

```json

import { InitSocket, sendWSPush, onmessageWS, oncloseWS, onerrorWS } from '@/libs/ws'

created: function () {
    // websocket 连接
    if (InitSocket()) {
        // 读取消息，渲染数据到页面
        if (!(onmessageWS() === null)) {
        this.msgHandle(onmessageWS())
    }
    }
    
    // 测试消息发送
    var msg = {
    op: 'rep',
    action: 'sub',
    param: {
      topic: ['runLog']
      }
    }
    sendWSPush(msg)
    this.listenConn()
}

methods: {
    msgHandle (msg) {
      console.log('ws msg is:', msg)
    },
 
    listenConn () {
      setInterval(function () {
        onerrorWS()
      }, 1000)
    },
}
```