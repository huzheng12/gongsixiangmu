import React, { Component } from 'react';
import './index.scss'
import TitleSE from '../../componetn/titlesecu';
import Biaoti from '../../componetn/biaoti';
import { Button, Table, Switch, message } from 'antd';
import { history } from '@/utils/history'
import { Link, NavLink } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import lang from '@/utils/language';
import { timehuansuan } from '../../../../../utils/time';
import { Xfn } from '../../../../../utils/axiosfn';
class Securityindex extends Component {
  constructor() {
    super()
    this.state = {
      title: lang().Safety_tips + " : " + lang().Safety_tips_text,
      tou: lang().Accounts_and_Security,
      switchFlg: false,
      columns: [
        {
          title: lang().login_time,
          dataIndex: 'login_time',
          width: 450,
          render: (text, record) => <div>
            {timehuansuan(text).date}
            &ensp;
            {timehuansuan(text).dates}
          </div>,
        },
        {
          title: lang().IP_address,
          width: 350,
          dataIndex: 'login_ip',
        },
        {
          title: lang().Location_of_login,
          dataIndex: 'login_location',
        }
      ],
      data: [

      ],
      zsxx: {},
      imgArr: {
        xm: require('../../../../img/my/me_shenfenyanzheng.png'),
        sj: require('../../../../img/my/me_shoujiyanzheng.png'),
        yx: require('../../../../img/my/me_youxiangyanzheng.png'),
        ioo: require("../../../../img/nothing_data.png"),

      },
      total: null
    }
  }
  aqguci = () => {
    Xfn({
      _u: "aqguci",
      _m: "post",
      _p: {

      }
    }, (res, code) => {
      if (code == 0) {
        var a = res.data.data.enable_phone_verify == "0" ? false : true
        this.setState({
          zsxx: res.data.data,
          switchFlg: a
        })
      }
    })
  }
  componentDidMount() {
    this.aqguci()
    this.historylength()
  }
  kaiqiyouxinag = () => {
    if (this.state.zsxx.bind_email == "1") {
      Xfn({
        _u: "enableverify",
        _m: "post",
        _p: {
          enable: "1",
        }
      }, (res, code) => { })
    } else {
      history.push('/personal/security/szemail')
    }
  }
  kgonChange = (checked) => {
    this.setState({
      switchFlg: !this.state.switchFlg
    })
    const obj = {
      enable: checked ? "1" : "0",
      time: new Date().getTime().toString()
    }
    Xfn({
      _u: "enable_phone_verify",
      _m: "post",
      _p: {
        enable: checked ? "1" : "0",
      }
    }, (res, code) => {
      if (code == 0) {
        this.aqguci()
      } else {
        this.setState({
          switchFlg: !this.state.switchFlg
        })
      }
    })
  }
  dangqianchipang = (a) => {
    if (sessionStorage.userInfo) {
      if (a <= 0) {
        return <div className="tablemeishuju">
          <img src={this.state.imgArr.ioo} alt="" />
          <div>
            {
              lang().You_dont_have_data
            }
          </div>
        </div>
      }
    }
  }
  historylength = (val) => {
    Xfn({
      _u: 'query_login_his',
      _m: 'get',
      _p: {
        pageSize: "5",
        currentPage: val ? val : '1',
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          data: res.data.data.rows,
          total: res.data.data.total
        })
      }
    })
  }
  render() {
    const { title, columns, data, tou, zsxx, imgArr, switchFlg, total } = this.state
    return (
      <div className="security-warp-fu1">
        <TitleSE zsxx={zsxx}></TitleSE>
        <Biaoti flg={true} content={title} title={tou} ></Biaoti>
        <div className="content-securityeee">
          <div className="gerenzase">
            <div className="h3-gerenz">
              <FormattedMessage id="Personal_certification" defaultMessage={'个人认证'} />
            </div>
            <div className="span-gerrenz">
              {
                lang().Personal_certification_text
              }
            </div>
            <div className="div-gerenz clear">
              <div className="hezi-gerenz">
                <div className="p-gerenzimg">
                  <img src={imgArr.xm} alt="" />
                </div>
                <div className="p-xingmname">
                  <FormattedMessage id="Full_name" defaultMessage={'姓名'} />

                </div>
                <div className="p-xingmnames">
                  {zsxx.real_name_auth == "1" ? zsxx.real_name && zsxx.real_name.substr(0, 1) + "**" :
                    <Link to="/personal/grsecurity">
                      <FormattedMessage id="identity_authentication" defaultMessage={'身份认证'} />
                    </Link>
                  }
                </div>
              </div>
              <div className="hezi-gerenz">
                <div className="p-gerenzimg">
                  <img src={imgArr.sj} alt="" />
                </div>
                <div className="p-xingmname">
                  <FormattedMessage id="Cell-phone_number" defaultMessage={'手机号'} />

                </div>
                <div className="p-xingmnames">
                  {zsxx.bind_phone == "1" ? zsxx.phone && zsxx.phone.substr(0, 3) + "****" + zsxx.phone.substr(-4) :
                    <Link to="/personal/security/szphone">    <FormattedMessage id="BindCellPhone" defaultMessage={'绑定手机'} /></Link>
                  }
                </div>
              </div>
              <div className="hezi-gerenz">
                <div className="p-gerenzimg">
                  <img src={imgArr.yx} alt="" />
                </div>
                <div className="p-xingmname">
                  <FormattedMessage id="mailbox" defaultMessage={'邮箱'} />

                </div>
                <div className="p-xingmnames">
                  {zsxx.bind_email == "1" ?
                    zsxx.email && <div style={{ position: "relative" }}>
                      <span>
                        {zsxx.email.substr(0, 3) + "****"}
                      </span>
                      <span style={{ position: "relative", right: 0, top: -2 }}>
                        {zsxx.email.split("@")[1]}
                      </span>
                    </div> :
                    <a onClick={() => history.push('/personal/security/szemail')} >  <FormattedMessage id="BindMailbox" defaultMessage={'绑定邮箱'} /></a>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="anquanrenz">
            <div className="h3-gerenz">
              <FormattedMessage id="security_setting" defaultMessage={'安全设置'} />

            </div>
            <div className="li-tablegezi clear">
              <div className="tou">
                <FormattedMessage id="Login_password" defaultMessage={'登录密码'} />

              </div>
              <div className="yanzheng">
                <FormattedMessage id="Set" defaultMessage={'已设置'} />
              </div>
              {
                zsxx.pwd_level == '3' ? <div className="content">
                  <span className=" clear" style={{ backgroundColor: "#2ABD6C" }}></span>
                  <span className=" clear" style={{ backgroundColor: "#2ABD6C" }}></span>
                  <span className=" clear" style={{ backgroundColor: "#2ABD6C" }}> </span>
                  <div style={{ backgroundColor: "#CAFFE2", color: "#2ABD6C" }}>
                    <FormattedMessage id="high" defaultMessage={'高'} />
                  </div>
                </div> : zsxx.pwd_level == "2" ? <div className="content">
                  <span className=" clear" style={{ backgroundColor: "#75A0F8" }}></span>
                  <span className="clear" style={{ backgroundColor: "#75A0F8" }}></span>
                  <span className="l clear"></span>
                  <div style={{ backgroundColor: "#D8E5FF", color: "#2E6BE6" }}> <FormattedMessage id="in" defaultMessage={"中"} /></div> </div> : <div className="content">
                      <span className=" clear"></span>
                      <span className="l clear"></span>
                      <span className="l clear"></span>
                      <div><FormattedMessage id="low" defaultMessage={"低"} /></div> </div>

              }
              <div className="but">
                <Button type="primary" style={{ width: 60, height: 30, marginTop: 22 }}
                  onClick={() => history.push('/personal/security/xglpa')}
                >{lang().modify}</Button>
              </div>
            </div>

            <div className="li-tablegezi clear">
              <div className="tou">
                {
                  lang().Mobile_phone_verification
                }
              </div>
              <div className="yanzheng">
                {
                  zsxx.bind_phone == "1" ? lang().Verified : lang().Unverified
                }
              </div>
              <div className="content">
                {
                  lang().Mobile_phone_verification_text
                }
              </div>
              <div className="but">
                {/* import { history } from '@/utils/history' */}
                {
                  zsxx.bind_phone == "1" ? <div className="clear">
                    <div className="lll" style={{ float: "right" }}>
                      <div style={{ float: "left", marginRight: 30, width: 1, height: 28, backgroundColor: "rgba(230,230,230,1)", marginTop: 23 }}>
                      </div>
                      <Switch checked={switchFlg} onChange={this.kgonChange} />

                    </div>
                    <div style={{ float: "right" }}>
                      <span className="phoneSpan">{
                        zsxx.phone.substr(0, 3) + "****" + zsxx.phone.substr(-4)
                      }</span>
                      <Button type="primary" style={{ width: 60, height: 30, marginTop: 22, marginLeft: 12 }}
                        onClick={() => history.push('/personal/security/xgphone')}>{lang().modify}</Button>
                    </div>

                  </div> : <div>
                      <Button type="primary" style={{ width: 60, height: 30, marginTop: 22 }}
                        onClick={() => history.push('/personal/security/szphone')}>{
                          lang().Set_up
                        }</Button>

                    </div>
                }

              </div>
            </div>
            <div className="li-tablegezi clear">
              <div className="tou">
                {
                  lang().Mailbox_Verification
                }
              </div>
              <div className="yanzheng">
                {
                  zsxx.bind_email == "1" ? lang().Verified : lang().Unverified
                }
              </div>
              <div className="content">
                {
                  lang().Mobile_phone_verification_text
                }
              </div>
              <div className="but">
                {
                  zsxx.bind_email == "1" ? <span className="phoneSpan">{
                    zsxx.email && zsxx.email.substr(0, 3) + "****" + zsxx.email.split("@")[1]
                  }</span> : <Button type="primary" onClick={() => history.push('/personal/security/szemail')}
                    style={{ width: 60, height: 30, marginTop: 22 }}>{lang().Set_up}</Button>
                }

              </div>
            </div>
            <div className="li-tablegezi clear" style={{ display: "none" }}>
              <div className="tou">
                谷歌验证
              </div>
              <div className="yanzheng">
                未验证
              </div>
              <div className="content">
                用于提币、修改安全设置时输入谷歌验证码
              </div>
              <div className="but">
                <Button type="primary" style={{ width: 60, height: 30, marginTop: 22 }}>设置</Button>
              </div>
            </div>
            <div className="li-tablegezi clear">
              <div className="tou">
                {
                  lang().Capital_Code
                }
              </div>
              <div className="yanzheng">
                {
                  zsxx.installed_fund_pwd == "1" ? lang().Verified : lang().Unverified
                }
              </div>
              <div className="content contents">
                {
                  lang().Capital_Code_text_1
                }
              </div>
              <div className="but" style={{ float: "right", color: "rgba(153,153,153,1)" }}>
                {
                  zsxx.bind_phone == "1" && zsxx.real_name ? zsxx.installed_fund_pwd === "1" ?
                    <div> <Button type="primary" style={{ width: 75, height: 30, marginTop: 22 }}
                      onClick={() => history.push("/personal/security/wjzjpsd")}><span style={{ width: 75 }}>{lang().Forget_the_password}</span>  </Button> <Button type="primary" style={{ width: 60, height: 30, marginTop: 22 }}
                        onClick={() => history.push("/personal/security/xgzjpsd")}>{lang().modify}</Button></div> : <Button type="primary"
                          onClick={() => history.push("/personal/security/zjpass")} style={{ width: 60, height: 30, marginTop: 22 }}>{lang().Set_up}</Button>
                    : <span style={{ fontSize: 16 }}>{lang().Please_bind_mobile_phone}</span>
                }

              </div>
            </div>
          </div>

          <div className="zuijindengl">
            <div className="h3-gerenz">
              {lang().Latest_login}
            </div>

            <Table pagination={{  // 分页
              hideOnSinglePage: true,
              total: total,
              pageSize: 5,
              onChange: this.historylength
            }} columns={columns} dataSource={data} />
            {
              this.dangqianchipang(data.length)
            }
          </div>
        </div>
      </div >
    );
  }
}

export default Securityindex;