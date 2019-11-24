import React, { Component } from 'react';
import "./index.scss";
import { Tabs, Input, Icon, Spin } from 'antd';
import { history } from '@/utils/history'
import axios from '../../../utils/ajax';
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import store from '@/scripts/store'
import { NavLink } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
import Subscribe from '@/utils/ws_sub_unsub';
import { depthfuncton } from '../../action';
var _that
@connect(
	state => {
		return {
			time: state.data.times,
			ticker: state.data.ticker,
			funding: state.data.funding,
			ticker_all: state.data.ticker_all,
			heyuename: state.data.heyuename,
			resolution: state.data.resolution,
			TransactionPage: state.datum.TransactionPage,
			dianjigengduo: state.datum.dianjigengduo,
			instrumentArr: state.data.instrumentArr,
			heyuenameSlipt: state.data.heyuenameSlipt,
			asset: state.data.asset,
		}
	}
)

class Zback extends Component {
	constructor() {
		super()
		this.state = {
			arr: [],
			imgArr: {
				a1: require("../../img/rate_down.png"),
				a2: require('../../img/rate_up.png'),
				a3: require('../../img/taadeinfo.png'),
				a4: require('../../img/time.png'),
				a5: require('../../img/marketinfo.png'),
			},
			dizhi: "",
			sousuo: []
		}
		_that = this
	}
	componentDidMount() {
		if (window.location.hash.indexOf('cont') == -1) {
			for (let i = 0; i < this.props.instrumentArr.length; i++) {
				let cs = "a" + i
				this.refs[cs].className = "zback-content-li"
			}
		}

	}
	componentDidUpdate() {
		if (this.props.TransactionPage == "1") {
			store.dispatch({ type: "TransactionPage", TransactionPage: "0" })
			Subscribe({
				_por: this.props,
				_this: _that,
				_pair: this.props.heyuename,
				_index: "0",
				_type: "1"
			})
		}

		if (this.props.dianjigengduo == 1) {
			// this.daohang()
			store.dispatch({ type: "dianjigengduo", dianjigengduo: 0 })
		}
		if (("/transaction/accountrecords" == history.location.pathname || "/transaction/inner" == history.location.pathname) && history.location.pathname !== this.state.dizhi && this.props.instrumentArr.length > 0) {
			var c = this.props.instrumentArr.length
			for (var i = 0; i < c; i++) {
				var b = "a" + i
				this.refs[b].className = "zback-content-li clear"
			}
			this.setState({
				dizhi: history.location.pathname
			})
		}
	}
	abnav = (a, b) => {
		Subscribe({
			_por: this.props,
			_this: _that,
			_pair: a.symbol,
			_index: b,
			_type: "1",
			_asset: a.settle_currency
		})
	}
	heyuetia = (e) => {
		if (e.target.className == "zback-content-li bclick" || e.target.className == "span33" || e.target.className == "span2") {
			history.push("/transaction/cont")
		}
	}
	daohang = () => {
		var c = this.props.instrumentArr.length
		for (var i = 0; i < c; i++) {
			var b = "a" + i
			if (this.refs[b]) { this.refs[b].className = "zback-content-li" }
		}
	}
	mohuchaxun = (val) => {
		if (val.target.value != "") {
			var list = this.props.instrumentArr
			var len = list.length;
			var arr = [];
			var reg = new RegExp(val.target.value, 'i');
			for (var i = 0; i < len; i++) {
				let a = list[i].symbol.split("_")[0] + "永续"
				if (a.match(reg)) {
					arr.push(list[i].symbol);
				} else {
					arr.push({});
				}
			}
			this.setState({
				sousuo: arr
			})
			return false
		} else {
			this.setState({
				sousuo: []
			})
			return false
		}
	}
	render() {
		const {
			imgArr,
			sousuo
		} = this.state
		const {
			instrumentArr,
			time
		} = this.props
		return (
			<div style={{ width: 180 }} className="zuoyi clear">
				<div className="content-tow inputaaa" onClick={this.heyuetia}>
					<Input
						style={{ borderColor: "transparent", height: 36, color: "rgba(153,153,153,1)" }}
						prefix={<Icon type="search" style={{ color: 'rgba(191,191,191,1)' }} />}
						placeholder="搜索"
						onChange={this.mohuchaxun}
					/>
					<p className="zback-content-p clear" style={{ marginBottom: 0, marginTop: 0 }}>
						<span className="span1"><FormattedMessage id="contract" defaultMessage={'合约'} /></span>
						<span className="span3" style={{ float: "right", marginTop: 16, marginLeft: 10 }}>
							<img style={{ marginBottom: 5, display: "block" }} src={imgArr.a1} alt="" />
							<img style={{ display: "block" }} src={imgArr.a2} alt="" />
						</span>
						<span className="span2"><FormattedMessage id="Gain" defaultMessage={'涨幅'} /></span>
					</p>
					{
						instrumentArr.length > 0 ? instrumentArr.map((item, index) => {
							if (sousuo.length > 0) {
								for (var i = 0; i < sousuo.length; i++) {
									if (item.symbol == sousuo[i]) {
										return (
											<div className={index == 0 ? "zback-content-li bclick clear" : "zback-content-li clear"}
												style={{ paddingLeft: 7 }}
												ref={"a" + index}
												onClick={() => this.abnav(item, index)}
												key={item + index}>
												<span className="span33">
													{item.symbol.split("_")[0]}<FormattedMessage id="sustainable" defaultMessage={'永续'} />
												</span>
												<span className="span2" style={{ color: item.change_rate_24h && item.change_rate_24h >= 0 ? "#82D9A0" : "#E63F39" }}>
													{
														item.change_rate_24h && item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
													}%
												</span>
											</div>
										)
									}
								}
							} else {
								return (
									<div className={window.location.hash.indexOf('cont') !== -1 && this.props.heyuename == item.symbol ? "zback-content-li bclick clear" : "zback-content-li clear"}
										style={{ paddingLeft: 7 }}
										ref={"a" + index}
										onClick={() => this.abnav(item, index)}
										key={item + index}>
										<span className="span33">
											{item.symbol.split("_")[0]}<FormattedMessage id="sustainable" defaultMessage={'永续'} />
										</span>
										<span className="span2" style={{ color: item.change_rate_24h && item.change_rate_24h >= 0 ? "#82D9A0" : "#E63F39" }}>
											{
												item.change_rate_24h && item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
											}%
										</span>
									</div>
								)
							}
						}) : <Spin />
					}
				</div>
				<div className="content-tow">
					<p style={{ background: "url(" + imgArr.jiaoyit1 + ") " + "no-repeat" }}>
						<img src={imgArr.a3} alt="" />
						<FormattedMessage id="Transaction_information" defaultMessage={'交易信息'} /></p>
					<NavLink className="navlinkuo" activeClassName="selected" to="/transaction/inner" onClick={this.daohang}>
						<FormattedMessage id="Contract_Entrustment" defaultMessage={'合约委托'} />
					</NavLink>
					<NavLink className="navlinkuo" activeClassName="selected" to="/transaction/accountrecords" onClick={this.daohang}>
						<FormattedMessage id="Contract_Bill" defaultMessage={'合约账户记录'} />
					</NavLink>
				</div>
				<div className="content-tow">
					<p style={{ background: "url(" + imgArr.shichangt1 + ") " + "no-repeat" }}>
						<img src={imgArr.a5} alt="" />	<FormattedMessage id="Market_Information" defaultMessage={'市场信息'} /></p>
					<div className="waijiew">
						<FormattedMessage id="Capital_rate" defaultMessage={'资金费率'} />
					</div>
					<div className="waijiew">
						<a href="https://gtehelp.zendesk.com/hc/zh-cn/articles/360035176054-%E6%B0%B8%E7%BB%AD%E5%90%88%E7%BA%A6%E7%AE%80%E4%BB%8B" target="_blank">
							<FormattedMessage id="Statement_of_Sustainable_Contract" defaultMessage={'永续合约说明'} />
						</a>
					</div>
					<div className="waijiew">
						<a href="https://gtehelp.zendesk.com/hc/zh-cn/sections/360005456733" target="_blank" >
							<FormattedMessage id="Common_problem" defaultMessage={'常见问题'} />
						</a>
					</div>
				</div>
				<div className="content-tow">
					<p style={{ background: "url(" + imgArr.shichangt1 + ") " + "no-repeat" }}>
						<img src={imgArr.a4} alt="" />{(() => {
							if (time.hour <= 12) { return <span>{time.month}-{time.riqi}   {time.hour}: {time.min}: {time.second}(AM)</span> }
							if (time.hour > 12) { return <span>{time.month}-{time.riqi}   {(time.hour - 12) < 10 ? "0" + (time.hour - 12) : (time.hour - 12)}: {time.min}: {time.second}PM</span> }
						})()}</p>
				</div>
			</div>
		);
	}
}

export default Zback;

