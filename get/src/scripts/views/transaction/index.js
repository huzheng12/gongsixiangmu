import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch, Redirect } from "react-router-dom"
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
import Zback from '@/scripts/components/zuoyi';
import ContractsCommissioned from './ContractsCommissioned';
import sendMessage from '@/utils//ws_send_message';
import Innercangs from './table';
import {
	objjj, wsreconnect, tokenfun, marketsquery
} from '../../action';
import AccountRecords from './accountrecords';
import './index.scss'
import EventFN from '../../../utils/eventfn';

@connect(
	state => {
		return {
			time: state.data.times,
			ticker_all: state.data.ticker_all,
			ws_connect: state.data.ws_connect,
			isLogin: state.data.isLogin,
			heyuename: state.data.heyuename,
			asset: state.data.asset,
		}
	},
	dispatch => {
		return {
			tokenFun: (n, a) => dispatch(tokenfun(n, a)),
			wsrecOnnect: (a) => dispatch(wsreconnect(a)),
			obJjj: (a) => dispatch(objjj(a)),
			marketsQuery: (a) => dispatch(marketsquery(a)),
		}
	}
)
class Transaction extends Component {
	constructor() {
		super()
	}
	componentDidUpdate() {
		if (this.props.ws_connect == 1 || this.props.isLogin == 1) {
			let options = sendMessage(this.props).obj
			if (window.wss.readyState === 1) {
				window.wss.send(JSON.stringify(options.instrument_all));
				window.wss.send(JSON.stringify(options.orderbookz));
				window.wss.send(JSON.stringify(options.trade));
				if (sessionStorage.userInfo) {
					window.wss.send(JSON.stringify(options.position_all));
					window.wss.send(JSON.stringify(options.pc_account));
					window.wss.send(JSON.stringify(options.order_all));
				}
			}
			// this.props.wsrecOnnect(0)
		}
	}
	render() {
		const {
			ticker_all,
		} = this.props
		return (
			<div className="transaction-warp clear">
				<Header></Header>
				{
					(() => {
						if (sessionStorage.userInfo) {
							return <div className="transaction-row">
								{
									ticker_all.map((item, index) => {
										return (
											<span key={index}>
												<span>
													{item.pair.split("_")[0] + "USD"}
												</span>
												<span>
													{
														EventFN.CurrencyDigitLimit({
															content: item.last,
															heyuename: item.pair
														})
													}
												</span>
												<span style={{ color: item.change_rate_24h >= 0 ? "#82D9A0" : "#E63F39" }}>
													{item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")}%
											</span>
											</span>
										)
									})

								}
							</div>
						}
					})()
				}
				{/* 导航下边栏 */}
				<div className="transaction-content clear" style={{ minHeight: 749 }}>
					<div className="content-left">
						{
							(() => {
								if (sessionStorage.userInfo) {
									return <Zback ws={window.wss} obj={sendMessage(this.props).objss}></Zback>
								}
							})()
						}
					</div>
					<div className="content-right" >
						<Switch>
							<Route path="/transaction/inner" component={Innercangs}></Route>
							<Route path="/transaction/cont" component={ContractsCommissioned}></Route>
							<Route path="/transaction/accountrecords" component={AccountRecords}></Route>
							<Redirect from="/" to="/transaction/cont" />
						</Switch>
					</div>
				</div>
				{/* 主体 */}
				<Footer></Footer>
			</div >
		);
	}
}

export default Transaction