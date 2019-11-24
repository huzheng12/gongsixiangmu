import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch } from "react-router-dom"
import Transaction from './views/transaction';
import Finance from './views/finance';
import Login from './views/login';
import Register from './views/register';
import Personal from './views/personal';
import AuthRouter from './authrouter';
import Resetpass from './views/ResetPassword';
import Rechengg from './views/register/rechenggong';
import Sices from './views/slices';
import Verify_type from './views/verifytype';
import fanyongBanner from './views/fanyongbanner';
import FullTradePage from './views/fulltradepage';
import { Xfn } from '../utils/axiosfn';
import { candlefunction, pcassetqueryfn, pairqueryfn, marketsquery, instrumentfn, pacaccoundt, orderBookLfn, positionfunction, pcaccount, orderfuntion, candlefunallction, assetfn } from './action';
import store from './store';
import sendMessage from '@/utils//ws_send_message';
import { connect } from "react-redux";
import IosDownload from './views/IOSdownload';
import IOSDownload from './views/h5/IOSDownload';
import IOSDownloadto from './views/h5/IOSDownloadto';
import AndroidDownload from './views/h5/AndroidDownload';
import Appregister from './views/h5/Appregister';
var asset
@connect(
	state => {
		return {
			heyuename: state.data.heyuename,
			asset: state.data.asset,
			asset_switch: state.data.asset_switch,
			differentiatedtransactions: state.datum.differentiatedtransactions,
		}
	}
)
class Index extends Component {
	constructor() {
		super()
		this.state = {

		}
	}
	componentWillUpdate() {
		if (this.props.asset_switch === 1) {
			Xfn({
				_u: 'pairQuery',
				_m: 'get',
				_p: {
					asset: this.props.asset
				}
			}, (res, code) => {
				if (code == 0) {
					store.dispatch(pairqueryfn(res))
				}
			})
			Xfn({
				_u: "marketsquery",
				_m: "get",
				_p: {
					asset: this.props.asset,
					symbol: this.props.heyuename,
					time: new Date().getTime().toString()
				}
			}, (res, code) => {
				if (code == 0) {
					store.dispatch(marketsquery(res.data.data.face_value))
					store.dispatch(assetfn(this.props.asset, 0))
				}
			})
		}
	}
	componentDidMount() {
		Xfn({
			_u: 'pcAssetQuery',
			_m: 'get',
			_p: {}
		}, (res, code) => {
			if (code == 0) {
				asset = res.data.data.asset[0]
				store.dispatch(pcassetqueryfn(res))
				Xfn({
					_u: 'pairQuery',
					_m: 'get',
					_p: {
						asset: asset
					}
				}, (res, code) => {
					if (code == 0) {
						store.dispatch(pairqueryfn(res))
						Xfn({
							_u: "marketsquery",
							_m: "get",
							_p: {
								asset: asset,
								symbol: res.data.data.rows[0].symbol,
								time: new Date().getTime().toString()
							}
						}, (res, code) => {
							if (code == 0) {
								store.dispatch(marketsquery(res.data.data.face_value))
							}
						})
					}
				})
			}
		})
		window.wss.onmessage = e => {
			const _workerdata = sendMessage(this.props).obj
			const _data = JSON.parse(e.data)
			switch (_data.event) {
				case _workerdata.instrument_all.event:
					store.dispatch(instrumentfn(_data.data))
					break;
				case _workerdata.orderbookz.event://解决
					store.dispatch(orderBookLfn(_data))
					break;
				case _workerdata.pc_account.event:
					store.dispatch(pcaccount(_data))
					break;
				case _workerdata.order_all.event:
					window.orderlength = "1"
					store.dispatch(orderfuntion(_data.data))
					break;
				case _workerdata.trade.event:
					store.dispatch(pacaccoundt(_data.data))
					break;
				case _workerdata.position_all.event:
					store.dispatch({ type: 'allposiont', allposiont: "1" })
					store.dispatch(positionfunction(_data.data))
					break;
				case localStorage.eventcandle:
					if (this.props.differentiatedtransactions === 1) {
						store.dispatch(candlefunallction(_data, _data.data.symbol))
					} else {
						store.dispatch(candlefunction(_data, 0))
					}
					break;
			}
		};
	}
	render() {
		return (<Hash basename="/">
			<div>
				<Switch>
					<Route exact path="/" component={Transaction}></Route>
					<Route path="/transaction" component={Transaction}></Route>
					<AuthRouter path="/finance" component={Finance}></AuthRouter>
					<Route path="/login" component={Login}></Route>
					<Route path="/verifytype" component={Verify_type}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/resetpass" component={Resetpass}></Route>
					<AuthRouter path="/personal" component={Personal}></AuthRouter>
					<Route path="/fanyonganner" component={fanyongBanner}></Route>
					<Route path="/registerwin" component={Rechengg} ></Route>
					<Route path="/sices" component={Sices} ></Route>
					<Route path="/iosdownload" component={IosDownload} ></Route>
					<Route path="/h5iosdownload" component={IOSDownload} ></Route>
					<Route path="/h5iosdownloadto" component={IOSDownloadto} ></Route>
					<Route path="/h5androiddownload" component={AndroidDownload} ></Route>
					<Route path="/appregister/:name" component={Appregister} ></Route>
					<Route path="/fulltrade" component={FullTradePage} ></Route>
				</Switch>
			</div>
		</Hash>);
	}
}
export default Index;