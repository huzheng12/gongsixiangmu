import React, { Component } from 'react';
import './index.scss'
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Securityindex from './anquan';
import Xgphone from './xgphone';
import Zjpassword from './zjpassword';
// import Bdemail from './bdemail';
import xgloginpass from './xgloginpass';
import Gugeyzq from './gugeyzq';
import Szphone from './szphone';
import Szemail from './szemial';
import Xgzjpass from './xgzjpass';
import Wjkzjpass from './wjzjpass';
class Security extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div className="security-warp-fu">
        <Switch>
          <Route path="/personal/security/index" component={Securityindex}></Route>
          <Route path="/personal/security/xgphone" component={Xgphone}></Route>
          <Route path="/personal/security/szphone" component={Szphone}></Route>
          <Route path="/personal/security/szemail" component={Szemail}></Route>
          {/* 手机 */}
          <Route path="/personal/security/zjpass" component={Zjpassword}></Route>
          <Route path="/personal/security/xgzjpsd" component={Xgzjpass}></Route>
          {/* 设置资金密码 */}
          {/* <Route path="/personal/security/bdemail" component={Bdemail}></Route> */}
          {/* 邮箱 */}
          <Route path="/personal/security/xglpa" component={xgloginpass}></Route>
          <Route path="/personal/security/wjzjpsd" component={Wjkzjpass}></Route>
          {/* 登录密码 */}
          <Route path="/personal/security/ggyz" component={Gugeyzq}></Route>

          <Redirect from="/personal/security" to="/personal/security/index" />
        </Switch>
      </div>
    );
  }
}

export default Security;