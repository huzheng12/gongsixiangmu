import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Shouxufei from '.';
class royte extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/personal/fxs/index" component={Shouxufei} ></Route>
          <Redirect from="/personal/fxs" to="/personal/fxs/index" />
        </Switch>
      </div>
    );
  }
}

export default royte;