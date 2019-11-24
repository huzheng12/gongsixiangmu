import React, { Component } from 'react';

class AndroidDownload extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/xiazai_img03.png'),
        but_ios01: require('./img/but_android.png'),

      }
    }
  }
  componentDidMount() {
    document.getElementsByTagName("body")[0].id = "h5html"
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  render() {
    const {
      imgArr
    } = this.state
    return (
      <div className='androiddownload-warp'>
        <header>
          <img class="logo_img" src={imgArr.logo_img} alt="" />
          <div class="h1_title">
            全球领先的数字合约交易平台
    </div>
          <div class="sub_h3">
            安全 · 稳定 · 可信
    </div>
        </header>

        <section class="content">
          <div class="list">
            <img src={imgArr.xiazai_img01} alt="" class="img_list" />
            <div class="size">
              <p>更安全</p>
              <p class="p2">老牌交易所</p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img02} alt="" class="img_list" />
            <div class="size">
              <p>更多糖果</p>
              <p class="p2">多元化奖励机制</p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img03} alt="" class="img_list" />
            <div class="size">
              <p>更多样</p>
              <p class="p2">支持合约等多种交易类型</p>
            </div>
          </div>
        </section>

        <footer>
          <img src={imgArr.but_ios01} alt="" class="footer_img" />
        </footer>
      </div>
    );
  }
}

export default AndroidDownload;