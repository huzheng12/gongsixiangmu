import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './index.scss'

import Qrcode from "qrcode.react";

class IosDownload extends Component {
  render() {
    return (
      <div className="iodownload-warp">
        <Header></Header>
        <main>
          <div className="title-course">
            GTE iOS 完整交易版下载教程
          </div>
          <div className="h6-title">
            您有两种方式下载完成交易版GTE
          </div>
          <table border="1">
            <tbody>
              <tr>
                <td style={{ width: 160 }}>内测版</td>
                <td>一键下载安装，更方便，功能更新更及时</td>
              </tr>
              <tr>
                <td>市场版</td>
                <td>更稳定，但需要非中国区Apple ID</td>
              </tr>

            </tbody>
          </table>
          <hr />
          <div className="h6-title">
            下载内测版
          </div>
          <Qrcode
            style={{
              marginLeft: 18
            }}
            value={"544554465"}
            size={120}
          />
          <div className="span-tips">
            请您扫描该二维码，根据提示完成安装即可
          </div>
          <div className="span-blod">
            下载成功后，请点击【设置】-【通用】-【设备管理】，找到GTE内测版的证书并点击信任，即可使用GTE
          </div>
          <hr />
          <div className="h6-title">
            下载市场版
          </div>
          <li>
            如果您拥有非中国地区的Apple ID，请直接使用该ID登录App Store，下载GTE APP即可。
          </li>
          <li>
            如果您没有以上地区的Apple ID，请发送邮件至 service@gte.com 标题注明”下载市场版GTE”即可，我们会尽快回复您。
          </li>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default IosDownload;