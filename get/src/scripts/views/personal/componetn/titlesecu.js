import React, { Component } from 'react';
import "./index.scss"
import { timehuansuan } from '@/utils/time';
import { Link } from "react-router-dom";
import lang from '../../../../utils/language';
class TitleSE extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        default_head: require('../../../img/my/default_head.png'),
        vip1: require('../../../img/my/vip1.png'),
        lv1: require('../../../img/lv1.png'),
        lv2: require('../../../img/lv2.png'),
        lv3: require('../../../img/lv3.png'),
        lv4: require('../../../img/lv4.png'),
        lv5: require('../../../img/lv5.png'),
        lv6: require('../../../img/lv6.png'),
        lv7: require('../../../img/lv7.png'),
        lv8: require('../../../img/lv8.png'),
        vip1: require('../../../img/vip1.png'),
        vip2: require('../../../img/vip2.png'),
        vip3: require('../../../img/vip3.png'),
        vip4: require('../../../img/vip4.png'),
        vip5: require('../../../img/vip5.png'),
        vip6: require('../../../img/vip6.png'),
        vip7: require('../../../img/vip7.png'),
        vip8: require('../../../img/vip8.png'),
      }
    }
  }
  render() {
    const {
      imgArr
    } = this.state
    const {
      zsxx
    } = this.props
    return (
      <div className="security-warp">
        <div className="title-security clear">
          <div className="title-right-box">
            <div className="img-titel clear">
              <img className="default_head" src={imgArr.default_head} alt="" />
              <div className="conten-went">
                <p className="wenZZ1 clear">
                  <span>{
                    zsxx.user_name
                  }</span>
                  <img src={(() => {
                    switch (zsxx.user_level) {
                      case "1": return imgArr.vip1
                      case "2": return imgArr.vip2
                      case "3": return imgArr.vip3
                      case "4": return imgArr.vip4
                      case "5": return imgArr.vip5
                      case "6": return imgArr.vip6
                      case "7": return imgArr.vip7
                      case "8": return imgArr.vip8
                      default: return imgArr.vip1;
                    }
                  })()} alt="" />
                </p>
                <p className="xianshishiji">
                  {lang().Last_logon_time}：
                  {
                    zsxx.last_login_time ? timehuansuan(zsxx.last_login_time).date + "   IP" + zsxx.login_ip : ""
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="fenge">
          </div>
          <div className="title-left-box">
            <p className="shouxuf">
              {lang().Fee_Level}
            </p>
            <p className="congtwenz">
              <span>
                {
                  lang().Increase_the_grade_and_enjoy_lower_handling_fees
                }
              </span>
              <Link to="/personal/fxs">{lang().Hierarchical_description}>></Link>
            </p>
          </div>


          <img className="img" src={
            (() => {
              switch (zsxx.user_level) {
                case "1": return imgArr.lv1
                case "2": return imgArr.lv2
                case "3": return imgArr.lv3
                case "4": return imgArr.lv4
                case "5": return imgArr.lv5
                case "6": return imgArr.lv6
                case "7": return imgArr.lv7
                case "8": return imgArr.lv8
                default: return imgArr.lv1;
              }
            })()
          } alt="" />
        </div>
      </div>
    );
  }
}

export default TitleSE;