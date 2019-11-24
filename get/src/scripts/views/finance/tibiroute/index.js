import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch, Redirect } from "react-router-dom"
import Tibi from '../zj-tibi';
import Tibiyang from '../zj-tibizheng';
import Zijindizhi from '../zj-tihuoguanli';
class TBrouter extends Component {
  constructor() {
    super()
    this.state = {
      urlroute: "/finance/withdrawmoney/sdyan"
    }
  }
  render() {
    return (
      <Switch>
        <Route path="/finance/withdrawmoney/sd" component={Tibi}></Route>
        <Route path="/finance/withdrawmoney/sdyan" component={Tibiyang}></Route>
        <Route path="/finance/withdrawmoney/address" component={Zijindizhi}></Route>
        <Redirect from="/finance/withdrawmoney" to={this.state.urlroute} />
      </Switch>
    );
  }
}

export default TBrouter;