import React, { Component } from 'react';
import './index.scss'
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"

import GrSecurtiyindex from './sfyanzindex';

import Sfyzcg from './sfyzcg';
class Grsecurtiy extends Component {
  constructor() {
    super()
    this.state = {
      ufl: "/personal/grsecurity/index"
    }
  }

  componentWillMount() {
   
  }
  render() {
    return (
      <div className="security-warp-fu">
        <Switch>
          <Route path="/personal/grsecurity/index" component={GrSecurtiyindex}></Route>
          <Route path="/personal/grsecurity/yz" component={Sfyzcg}></Route>
          <Redirect from="/personal/grsecurity" to={this.state.ufl} />
        </Switch>
      </div>
    );
  }
}

export default Grsecurtiy;