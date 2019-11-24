import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { history } from '@/utils/history'
import { Button, message, Modal } from 'antd';
import './index.scss'
import TableForm from '../../components/tableForm';
import { dangqianchipang } from '@/utils/dangqianchipang'
import ShareImage from '../../components/shareImage'
import { timehuansuan } from '../../../utils/time';
import { Xfn } from '../../../utils/axiosfn';
// import EventFN from '../../../utils/eventfn';

class fanyongBanner extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        a1: require('../../img/fanyong_banner.png'),
        a2: require('../../img/fanyong_buzou01.png'),
        a3: require('../../img/fanyong_buzou02.png'),
        a4: require('../../img/fanyong_buzou03.png'),
        a5: require('../../img/fanyong_share_imgicon.png'),
        a6: require('../../img/fanyong_bangdan_no1.png'),
        a7: require('../../img/fanyong_bangdan_no2.png'),
        a8: require('../../img/fanyong_bangdan_no3.png'),
        a9: require('../../img/share_bg_img.png'),
      },
      address: 'https://www.gte.io/zh-cn/topic/invited/?invite_code=ysrm3',
      addresse: "",
      getInviteUser: [],
      getSortRakeBack: [],
      dataLength: "",
      pictureSharing: false,
      columns: [
        {
          title: "被邀请的人账号",
          dataIndex: 'account_id',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: "时间",
          dataIndex: 'time',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>

            {timehuansuan(text).date}
            &ensp;
              {timehuansuan(text).dates}

          </div>,
        },
        {
          title: "直接/间接",
          dataIndex: 'level',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text == "1" ? "直接" : "间接"}
          </div>,
        },
        {
          title: "状态",
          dataIndex: 'rake_back_status',
          align: "right",
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text == "1" ? "已返佣" : "未返佣"}
          </div>,
        },
      ],
      columns1: [
        {
          title: "佣金",
          dataIndex: 'account_id',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: "发放时间",
          dataIndex: 'rake_back_status',
          align: "right",
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text == "1" ? "已返佣" : "未返佣"}
          </div>,
        },
      ],
      getRakeBack: [],
      getRakeBacklength: "",
      sumAmt: "",
      nian: "",
      yue: ""
    }
  }
  componentDidMount() {
    var dat = new Date()
    this.setState({
      nian: dat.getFullYear(),
      yue: dat.getMonth() + 1,
    })
    if (sessionStorage.userInfo) {
      Xfn({
        _u: "getInviteUser",
        _m: "get",
        _p: {
          current_page: "1",
          page_size: "10",
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        this.setState({ getInviteUser: res.data.data.rows, dataLength: res.data.data.total })
      })
      Xfn({
        _u: "getReferrerCode",
        _m: "get",
        _p: {
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        console.log(res.data.data)
        this.setState({
          address: res.data.data.referrer_url,
          addresse: res.data.data.referrer_code
        })
      })
      Xfn({
        _u: "getRakeBack",
        _m: "get",
        _p: {
          page_size: "1",
          current_page: "10",
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        this.setState({ getRakeBack: res.data.data.rows, getRakeBacklength: res.data.data.total, sumAmt: res.data.data.sum_amt })
      })
    }
    Xfn({
      _u: "getSortRakeBack",
      _m: "get",
      _p: {
        count: "10",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      this.setState({ getSortRakeBack: res.data.data.rows })
    })

  }
  pictureSharing = () => {
    this.setState({ pictureSharing: true })
  }
  pictureSharingCancel = () => {
    this.setState({ pictureSharing: false })
  }
  pictureSharingOk = () => {
    this.refs.shareimg.ClickDownLoad()
    this.setState({ pictureSharing: false })
  }
  render() {
    const { imgArr, address, addresse, getSortRakeBack, getInviteUser, columns, dataLength, columns1, getRakeBack, getRakeBacklength, sumAmt } = this.state
    console.log(address)
    return (
      <div className="fanyong-annerwarp">
        <Header></Header>
        <article>
          <section>
            <img className="imga1" src={imgArr.a1} alt="" />
          </section>
          <section>
            <div className="wPHz-box clear">
              <div className="conste-p1 clear">
                <img src={imgArr.a2} alt="" />
                <p className="spans-cos1">
                  <span>发送邀请给好友</span>
                  <span>通过分享链接邀请好友注册GTE</span>
                </p>
                <div className="br-bordayangshi">

                </div>
              </div>
              <div className="conste-p1">
                <img src={imgArr.a3} alt="" />
                <p className="spans-cos1">
                  <span>好友注册</span>
                  <span>好友接受邀请完成注册并进行合约交易</span>
                </p>
                <div className="br-bordayangshi">

                </div>
              </div>
              <div className="conste-p1">
                <img src={imgArr.a4} alt="" />
                <p className="spans-cos1">
                  <span>获得相应比例返佣</span>
                  <span>轻松获得交易手续费返佣福利</span>
                </p>
              </div>
              <div className="position-box">
                <div className="my-yaoqingma clear">
                  <div className="span-my-1">
                    我的专属邀请码:
                    </div>
                  <div className="span-my-2">
                    {
                      (() => {
                        if (sessionStorage.userInfo) {
                          if (!addresse) { return "--" }
                          return addresse
                        } else {
                          return "******"
                        }
                      })()
                    }

                  </div>
                  <CopyToClipboard text={addresse}
                    onCopy={() => {
                      this.setState({ copied: true })
                      message.success('复制成功');
                    }}>
                    <Button className="bglanse" style={{ width: 80 }} type="primary">复制</Button>
                  </CopyToClipboard>
                  {/* <Button type="primary" style={{ width: 80 }}>复制</Button> */}
                </div>
                <div className="my-yaoqingma clear">
                  <div className="span-my-1">
                    我的专属邀请方式:
                    </div>
                  <div className="span-my-5">
                    {
                      (() => {
                        if (sessionStorage.userInfo) {
                          return address
                        } else {
                          return "******"
                        }
                      })()
                    }

                  </div>
                  {
                    (() => {
                      if (sessionStorage.userInfo) {
                        return <div>
                          <CopyToClipboard text={address}
                            onCopy={() => {
                              this.setState({ copied: true })
                              message.success('复制成功');
                            }}>
                            <Button className="bglanse" style={{ width: 80 }} type="primary">复制</Button>
                          </CopyToClipboard>
                          <div className="span-my-6">
                            或
                  </div>
                          <Button onClick={this.pictureSharing} className="bglanse" type="primary" style={{ width: 160 }}>
                            <img src={imgArr.a5} alt="" />
                            图片分享
                            </Button>
                        </div>
                      } else {
                        return <div>
                          <Button type="primary" style={{ width: 120 }} onClick={() => history.push('/login')}>
                            登录/注册
                            </Button>
                        </div>
                      }
                    })()
                  }

                </div>
              </div>
            </div>
          </section>
          <Modal
            className="pictureSharing"
            title=""
            visible={this.state.pictureSharing}
            onOk={this.pictureSharingOk}
            onCancel={this.pictureSharingCancel}
            okText="保存到本地"
          >
            <ShareImage addresse={address} ref="shareimg" className="tupianxiazai "></ShareImage>
          </Modal>
          <section>
            <div className="content-box">
              {
                (() => {
                  if (sessionStorage.userInfo) {
                    return <div className="tabe-box clear">
                      <div className="content-box-a  content-box-c">
                        <div className="content-table">
                          <div className="content-table-title">
                            邀请记录
                            <span className="span">邀请总人数: <span>{dataLength ? dataLength : "0"}</span>人   </span>
                          </div>
                          <TableForm columns={columns} data={getInviteUser} dataLength={dataLength}></TableForm>
                          {dangqianchipang(dataLength)}
                        </div>
                      </div>
                      <div className="content-box-a content-box-c content-box-d">
                        <div className="content-table">
                          <div className="content-table-title">
                            返佣记录
                            <span className="span">佣金总额： <span>{sumAmt}</span>BTC   </span>
                          </div>
                          <TableForm columns={columns1} data={getRakeBack} dataLength={getRakeBacklength}></TableForm>
                          {dangqianchipang(getRakeBacklength)}
                        </div>
                      </div>
                    </div>
                  }
                })()
              }
              <div className="content-box-a ">
                <div className="content-table">
                  {
                    console.log(this.state.nian, this.state.yue)
                  }
                  <div className="content-table-title">
                    {this.state.nian}年{this.state.yue}月邀请榜单
                          </div>
                  <div className="content-table-theerder clear">
                    <div className="tr">排名</div>
                    <div className="tr">邀请人账号</div>
                    <div className="tr">返佣折合</div>
                  </div>
                  {
                    getSortRakeBack.map((item, index) => {
                      return <div className="content-table-td clear" key={index + item}>
                        <div className="tr"><img src={(() => {
                          switch (item.sort) {
                            case "1": return imgArr.a6;
                            case "2": return imgArr.a7;
                            case "3": return imgArr.a8;
                            default:
                              return item.sort;
                              break;
                          }
                        })()} alt="" /></div>
                        <div className="tr">{
                          (() => {
                            if (item.account.indexOf("@") == -1) {
                              return <span>{item.account.substr(0, 3) + "****" + item.account.substr(-4)}</span>
                            } else {
                              let a = item.account.replace(/\"/g, "")
                              return <div>
                                <span>
                                  {a.substr(0, 3) + "****"}
                                </span>
                                <span>
                                  {a.split("@")[1]}
                                </span>
                              </div>
                            }
                          })()
                        }</div>
                        <div className="tr">{
                          item.sum_amt
                        }BTC</div>
                      </div>
                    })
                  }
                </div>
              </div>
              {dangqianchipang(getSortRakeBack.length, "token")}
              <div className="content-box-b content-box-a">
                <div className="content-table">
                  <div className="content-table-title">
                    活动细则
                  </div>
                  <p>
                    1、好友接受邀请后，每产生一笔真实交易手续费，会产生相应比例的返佣。
                    </p>
                </div>
              </div>
            </div>
          </section>
        </article>
        <Footer></Footer>
      </div>
    );
  }
}

export default fanyongBanner;