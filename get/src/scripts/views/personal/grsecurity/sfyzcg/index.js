import React, { Component } from 'react';
import Biaoti from '../../componetn/biaoti';
import lang from '@/utils/language';
import './index.scss'
class Sfyzcg extends Component {
  constructor() {
    super()
    this.state = {
      tou: lang().Personal_authentication,
      tiele: lang().please_fill_in_it_truthfully + "..",
      imgAee: require('../../../../img/login/box_success.png')
    }
  }
  render() {
    const { tou, tiele, imgAee } = this.state
    return (
      <div className="sfyzcg-warp">
        <Biaoti content={tiele} flg={true} title={tou} ></Biaoti>
        <div className="hezi-box">

          <img className="img" src={imgAee} alt="" />

          <div className="span">
            {lang().Certification_completed}！
          </div>
          <div className="spans">
            {
              lang().transaction_and_replenish_currency
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Sfyzcg;