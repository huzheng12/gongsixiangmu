import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Shouxufei from '.';
import Apiyemian from '.';
class roytess extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/personal/apiguanli/index" component={Apiyemian} ></Route>
          <Redirect from="/personal/apiguanli" to="/personal/apiguanli/index" />
        </Switch>
      </div>
    );
  }
}

export default roytess;