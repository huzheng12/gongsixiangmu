import React, { Component } from 'react';
import "./index.scss"
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Asset from './my-zichan';
import Account from './zj-account';
import Chongbi from './zj-chongbi';
import Huazhuan from './zj-zijinghuazhuan';
import Yongxu from './yx-heyue';
import TBrouter from './tibiroute';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { Xfn } from '../../../utils/axiosfn';
import store from '@/scripts/store.js'

class Finance extends Component {
  constructor() {
    super()
    this.state = {
      openKeys: ['sub1'],
      imgArr: {
        assets: require('../../img/finance/assets.png'),
        account: require('../../img/finance/account.png'),
        deal: require('../../img/finance/deal.png'),
      },
      a: true,
      _Url: "/finance/withdrawmoney"
    }
  }
  componentDidMount() {
    Xfn({
      _u: "authrenzz",
      _m: "get",
      _p: {
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        const daa = res.data.data
        if (daa.fund_pwd_auth != "0" && daa.identity_auth != "0" && daa.short_msg_auth == "1") {
          this.setState({
            _Url: "/finance/withdrawmoney/sd"
          })
          store.dispatch({ type: "withdrawmoney", withdrawmoney: "1" })
        }
      }
    })
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    const {
      imgArr,
      a,
      _Url
    } = this.state
    return (
      <div className="">
        <Header></Header>
        <div className="finance-warp clear">
          {/* 导航 */}
          <div className="left-finance">
            <div className="nav">
              <div className="nav-fist">
                <img src={imgArr.assets} alt="" />
                <span><FormattedMessage id="My_assets" defaultMessage={'我的资产'} /></span>
              </div>
              <NavLink to="/finance/asset" className="navlinkuo" activeClassName="selected"><FormattedMessage id="My_assets" defaultMessage={'我的资产'} /></NavLink>
            </div>
            <div className="nav">
              <div className="nav-fist">
                <img src={imgArr.account} alt="" />
                <span><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></span>
              </div>
              <NavLink to="/finance/account" className="navlinkuo" activeClassName="selected"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></NavLink>
              <NavLink onClick={() => {
                store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: "" })
              }} to="/finance/chongbi" className="navlinkuo" activeClassName="selected"><FormattedMessage id="Coin_charging" defaultMessage={'充币'} /></NavLink>
              <NavLink onClick={() => {
                store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: "" })
              }} to={_Url} className={window.location.hash.indexOf("address") != -1 ? 'navlinkuo selected' : "navlinkuo"} activeClassName="selected"><FormattedMessage id="Withdraw_money" defaultMessage={'提币'} /></NavLink>
              <NavLink to="/finance/huazhuan" onClick={() => {
                store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: "" })
              }} className="navlinkuo" activeClassName="selected"><FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} /></NavLink>
            </div>
            <div className="nav">
              <div className="nav-fist">
                <img src={imgArr.deal} alt="" />
                <span><FormattedMessage id="Transaction_account" defaultMessage={'交易账户'} /></span>
              </div>
              <NavLink to="/finance/yongxu" className="navlinkuo" activeClassName="selected"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></NavLink>
            </div>
          </div>
          {/* content */}
          <div className="right-finance">
            <Switch>
              <Route path="/finance/asset" component={Asset}></Route>
              <Route path="/finance/account" component={Account}></Route>
              <Route path="/finance/chongbi" component={Chongbi}></Route>
              <Route path="/finance/withdrawmoney" component={TBrouter}></Route>
              <Route path="/finance/huazhuan" component={Huazhuan}></Route>
              <Route path="/finance/yongxu" component={Yongxu}></Route>
              <Redirect from="/finance" to="/finance/asset" />
            </Switch>
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}
export default Finance;