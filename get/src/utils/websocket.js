import EventFN from "./eventfn";
import store from "../scripts/store";
import { wsreconnect } from "../scripts/action";

class WebSocketClass {
  constructor() {
    this.instance = null;
    this.connect();
    this.reconnect()
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketClass();
    }
    return this.instance;
  }
  reconnect() {
    //没连接上会一直重连，设置延迟避免请求过多
    window.wss.onclose = () => {
      this.connect();
    };
    window.wss.onerror = () => {
      this.connect();
    };
  }

  connect() {
    window.wss = new WebSocket('wss://www.bitmex.com/realtime');
    window.wss.onopen = e => {
      store.dispatch(wsreconnect(1))
      this.status = 'open';
      console.log(`连接成功`, e);
      this.heartCheck();
      this.getMessage();
    };
  }

  heartCheck() {
    // 心跳机制的时间可以自己与后端约定
    this.pingPong = {
      "op": "ping",
    };
    // ws的心跳机制状态值
    this.pingInterval = setInterval(() => {
      if (window.wss.readyState === 1) {
        // 检查ws为链接状态 才可发送
        window.wss.send(JSON.stringify({
          "op": "ping",
        }));
        // 客户端发送ping
      }
    }, 20 * 1000);
    this.pongInterval = setInterval(() => {
      console.log(this.pingPong)
      if (this.pingPong === {
        "op": "ping",
      }) {
        this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
      }
      // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
      // console.log('返回pong');
      this.pingPong = {
        "op": "ping",
      };
    }, 30000);
  }

  closeHandle(e = 'err') {
    console.log(e)
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.status !== 'close') {
      console.log(`断开，重连websocket`, e);
      if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval);
        clearInterval(this.pongInterval);
      }
      this.connect(); // 重连
    } else {
      console.log(`websocket手动关闭,或者正在连接`);
    }
  }

  getMessage() {
    window.wss.onmessage = e => {
      console.log(e)
      const _data = JSON.parse(e.data)
      if (_data.op === "pong") {
        this.pingPong = { "op": "pong" }; // 服务器端返回pong,修改pingPong的状态
      } else {
        switch (_data.table) {
          case "orderBookL2_25":
            EventFN.orderBookL2_25(_data)
            break;
          case "orderBookL2":
            EventFN.orderBookL2_25(_data)
            break;
          case "instrument":
            EventFN.instrumentFn(_data)
            break;
          case "trade":
            EventFN.tradeFn(_data)
            break;
          case "tradeBin1m":
            console.log(_data, "{{{{{{{{{{{{{{{{{{")
            EventFN.candlefunctionFn(_data)
            break;
        }
      }
      return e.data;
    };
  }

  close() {
    clearInterval(this.pingInterval);
    clearInterval(this.pongInterval);
    this.status = 'close';
    window.wss.send('close');
    window.wss.close();
  }
}

export default WebSocketClass;