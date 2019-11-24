import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss'
import store from './scripts/store'
import { Provider } from 'react-redux'
import Index from './scripts/router';
import Intl from './Intl';
import ReconnectWebsocket from 'reconnecting-websocket';
import { wsreconnect, change_language } from './scripts/action';
// 兼容ie
import "react-app-polyfill/ie11";
// import  "react-app-polufill/stable";
let wsurl = window.location.hostname.indexOf('gte.io') === -1 ? "wss://shhp.f3322.net:11000" : 'wss://testwss.gte.io'
// let wsurl = window.location.hostname.indexOf('gte.io') === -1 ? "wss://shhp.f3322.net:11000" : 'wss://netapi.gte.io:1000'
window.wss = new ReconnectWebsocket(wsurl);
store.dispatch(change_language(localStorage.language))
window.IntervalWS = setInterval(() => {
    if (window.wss && window.wss.readyState === 1) {
        try {
            window.wss.send(JSON.stringify({
                "op": "ping",
            }));
        } catch (e) {
            console.error(`ws has error: ${e}`)
        }
    }
}, 5 * 1000);

window.wss.onopen = function () {
    console.log('ws开启')
    localStorage.ws_connect = "1"
    store.dispatch(wsreconnect(1))
    return true;
}
window.wss.onclose = function () {
    console.log('ws关闭');
    store.dispatch(wsreconnect(0))
    localStorage.ws_connect = "0"
    window.wss.close()

    window.wss.reconnect();
}
function hotRender() {
    ReactDOM.render(
        <Provider store={store}>
            <Intl>
                <Index />
            </Intl>
        </Provider>
        , document.getElementById('root'));
}
hotRender()
store.subscribe(hotRender)
serviceWorker.unregister();
