import React, { Component } from 'react';
import './index.scss'
import Biaoti from '../../componetn/biaoti';
class Gugeyzq extends Component {
  constructor() {
    super()
    this.state = {
      consot: "谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。"
    }
  }
  render() {
    const {
      consot
    } = this.state
    return (
      <div className="ggyz-warp">
        <Biaoti flg={true} content={consot} title={"绑定谷歌验证器"}></Biaoti>
      </div>
    );
  }
}

export default Gugeyzq;