import React, { Component } from 'react';

class Biaoti extends Component {
  constructor() {
    super()
    this.state = {
      aimg: require('../../../img/finance/box_point01.png')
    }
  }
  wenzicshuoming = (a, b) => {
    if (a) {
      return (<div className="anquanshiti">
        <img src={this.state.aimg} alt="" />
        <span>
          {b}
        </span>
      </div>)
    }
  }
  render() {
    const {

    } = this.state
    const {
      content,
      flg,
      title
    } = this.props

    return (
      <div className="biaoti-warp">
        <div className="title-biaoti">
          {title}
        </div>
        {
          this.wenzicshuoming(flg, content)
        }
      </div>
    );
  }
}

export default Biaoti;