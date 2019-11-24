import React, { Component } from 'react';
import "./index.scss"
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { history } from '@/utils/history'
import Security from './security';
import GrSecurtiy from './grsecurity';
import Shouxufei from './shouxufei';
import royte from './shouxufei/royte';
import Apiyemian from './apiyemian';
import lang from '@/utils/language';
import roytess from './apiyemian/router';
import { Xfn } from '../../../utils/axiosfn';
class Personal extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        assets: require('../../img/my/me.png'),
      },
      _urlFX: '/personal/grsecurity'
    }
  }
  componentDidMount() {
    Xfn({
      _u: "aqguci",
      _m: "post",
      _p: {
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0 && res.data.data.real_name_auth == "1") {
        this.setState({ _urlFX: "/personal/grsecurity/yz" })
      }
    })
  }
  render() {
    const {
      imgArr,
      _urlFX
    } = this.state
    return (
      <div className="personal">
        <Header></Header>
        <div className="content-warp-personal clear">
          <div className="nav-erji">
            <div className="left-finance">
              <div className="nav">
                <div className="nav-fist">
                  <img src={imgArr.assets} alt="" />
                  <span>{lang().Personal_Center}</span>
                </div>
                <NavLink to="/personal/security" className="navlinkuo" activeClassName="acitosdk-navlink">{lang().Account_security}</NavLink>
                <NavLink to={_urlFX} className="navlinkuo" activeClassName="acitosdk-navlink">{lang().Real_name_authentication}</NavLink>
                <NavLink to="/personal/fxs" className="navlinkuo" activeClassName="acitosdk-navlink">{lang().Fee_Level}</NavLink>
                <NavLink to="/fanyonganner" className="navlinkuo" activeClassName="acitosdk-navlink">{lang().Invite_Commission}</NavLink>
                <NavLink to="/personal/apiguanli" className="navlinkuo" activeClassName="acitosdk-navlink">{lang().APIManagement}</NavLink>
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/personal/security" component={Security} ></Route>
            <Route path="/personal/grsecurity" component={GrSecurtiy} ></Route>
            <Route path="/personal/apiguanli" component={roytess} ></Route>
            <Route path="/personal/fxs" component={royte} ></Route>
            <Redirect from="/personal" to="/personal/security" />
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Personal;