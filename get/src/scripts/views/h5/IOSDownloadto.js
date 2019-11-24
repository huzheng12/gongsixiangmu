import React, { Component } from 'react';
import './index.scss'
class IOSDownloadto extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        xiazai_logo: require('./img/xiazai_logo.png'),
        ios_store_tips_1: require('./img/ios-store-tips-1.png'),
        biaoti_icon: require('./img/biaoti_icon.png'),
        biaoti_icon1: require('./img/today.png'),
        biaoti_store: require('./img/ios-store-tips-1-3.png'),
        biaoti_icon2: require('./img/ios-store-tips-2.png'),
        biaoti_icon21: require('./img/ios-store-tips-2-1.png'),
        but_ios03: require('./img/but_ios03.png'),
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
      <div className="iosdownloadto-warp">
        <header>
          <img class="logo_img" src={imgArr.xiazai_logo} alt="" />
          <div class="h1_title">
            <p class="tiele">
              GTE App Store 安装
      </p>
            <p class="p1">
              如果您拥有非中国地区的 Apple ID，请直接使用该 ID 登录 App Store，下载 GTE APP 即可。
      </p>
          </div>
        </header>

        <section class="content">
          <img class="img-1" src={imgArr.ios_store_tips_1} alt="" />
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  进入 App Store 应用
          </span>
              </div>
              <img src={imgArr.biaoti_icon} alt="" class="store-tipss" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  点击 App Store 首页右上角头像
          </span>
              </div>
              <img src={imgArr.biaoti_icon1} alt="" class="store-tipss store-tipss780" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  点击退出登录，重新输入 Apple ID 和密码
          </span>
              </div>
              <img src={imgArr.biaoti_store} alt="" class="store-tipss store-tips-1-3" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  输入非中国大陆苹果账号
          </span>
              </div>
              <p class="xianggang">

                以下香港 ID 供参考使用，请记录好您所使用的账号及密码，
                以便更新时使用
        </p>

              <div class="table">
                <div class="tr">
                  <div class="td th">
                    账号
            </div>
                  <div class="td th">
                    密码
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    zaqy80a6@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    qffa2p18@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    mf83c338@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    lnlf6h10@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    oy44mq3h@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    xz7x1npo@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    jl1y8uc7@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    d79b4z6y@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    y188t17y@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td tdborder">
                    b27y8u2v@icloud.com
            </div>
                  <div class="td tdborder">
                    Dd112211
            </div>
                </div>
              </div>
              <p class="fangzhi">为防止您的手机信息泄露，请务必不要使用上方 Apple ID 登录 iCloud。使用以上 Apple ID 下载过后，请您及时退出该账号
        </p>
            </div>
          </div>
        </section>
        <div class="content">
          <img class="img-1" src={imgArr.biaoti_icon2} alt="" />
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  登录成功后，会自动跳转至香港版的App Store点击
                  App Store下方的搜索，然后在页面输入框中搜索GTE
          </span>
              </div>
              <img src={imgArr.biaoti_icon21} alt="" class="store-tipss tips-2-1" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  点击“GET“按钮，开始安装App，回到桌面查看即可
          </span>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <img src={imgArr.but_ios03} alt="" class="footer_img" />
        </footer>
      </div>
    );
  }
}

export default IOSDownloadto;