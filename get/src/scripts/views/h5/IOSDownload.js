import React, { Component } from 'react';
import './index.scss'
import { history } from '@/utils/history'
class IOSDownload extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/xiazai_img03.png'),
        but_ios01: require('./img/but_ios01.png'),
        but_ios02: require('./img/but_ios02.png'),
      }
    }
  }
  componentDidMount() {
    document.getElementsByTagName("body")[0].id = "h5html"
    function isAndroid() {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        if (window.ShowFitness !== undefined) return true;
      }
      return u;
    }
    // 判断设备为 iosa
    if (isAndroid() !== true) {
      history.push('/h5androiddownload')
      // window.location.href = 'https://hupa.7766.org:3013/#/h5androiddownload'
    }
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  render() {
    const {
      imgArr
    } = this.state
    if (document.getElementById("launcher")) {
      document.getElementById("launcher").style.display = 'none'
    }
    return (
      <div className="iosdownload-warp">
        <div className="herder">
          <img class="logo_img" src={imgArr.logo_img} />
          <div class="h1_title">
            全球领先的数字合约交易平台
        </div>
          <div class="sub_h3">
            安全 · 稳定 · 可信
        </div>

        </div>
        <section class="content">
          <div class="list">
            <img src={imgArr.xiazai_img01} class="img_list" />
            <div class="size">
              <p>更安全</p>
              <p class="p2">老牌交易所</p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img02} class="img_list" />
            <div class="size">
              <p>更多糖果</p>
              <p class="p2">多元化奖励机制</p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img03} class="img_list" />
            <div class="size">
              <p>更多样</p>
              <p class="p2">支持合约等多种交易类型</p>
            </div>
          </div>
        </section>

        <footer>
          <div class="foorter-box">
            <div class="img-but">
              <img src={imgArr.but_ios01} onClick={() => {
                window.location.href = "https://app.1fenfa.com/app/ISKa";
              }} />
            </div>
            <div class="foot-p1 p1">

              稳定安全，更新方便快捷

      </div>
            <div class="foot-p2 p1">

              免费提供公共Apple ID

      </div>
          </div>
          <div class="foorter-box">
            <div class="img-but imgbg">
              <img src={imgArr.but_ios02} />
            </div>
            <div class="foot-p1 p1">
              安装简便快捷
      </div>
            <div class="foot-p2 p1">
              更新需要再次安装
      </div>
          </div>

        </footer>
      </div>
    );
  }
}

export default IOSDownload;