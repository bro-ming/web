# web

前端写的不多，也没啥好封装的，开发中遇到了websocket，简单封装-留个纪念，自己使用 
另外服务端<https://github.com/bro-ming/c/tree/main/ws>
#### 消息使用AES加密传输，接收解密读取，发送加密发送，也可封装参数来控制，抽空完善吧
#### 使用举例

```js

import { InitSocket, sendWSPush, onmessageWS, oncloseWS, onerrorWS } from '@/libs/ws'

created() {

    // websocket 连接
    if (InitSocket()) {
            
        // 读取消息
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
      console.log('msg:', msg)
    }
        
    listenConn () {
      setInterval(function () {
        onerrorWS()
      }, 1000)
    }
}
```