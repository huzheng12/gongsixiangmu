import React, { Component } from 'react';
import { history } from '@/utils/history';
import { FormattedMessage } from 'react-intl';
import "./index.scss"
import { Xfn } from '../../../../utils/axiosfn';
class Tibiyang extends Component {
  constructor() {
    super()
    this.state = {
      tibirenzheng: {}
    }
  }
  componentDidMount() {
    Xfn({
      _u: "authrenzz",
      _m: "get",
      _p: {
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        const daa = res.data.data
        this.setState({
          tibirenzheng: daa
        })
        if (daa.fund_pwd_auth != "0" && daa.identity_auth != "0" && daa.short_msg_auth == "1") {
          history.push("/finance/tibi/sd")
        }
      }
    })
  }
  render() {
    const { tibirenzheng } = this.state
    return (
      <div className="tibiyang-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Withdraw_money" defaultMessage={'提币'} /></h1>
        </div>
        <div className="content-tibiyang">
          <div>
            <FormattedMessage id="sake_of_your_account_security" defaultMessage={'为了您的账户安全，需要你完成以下步骤即可提币'} />
          </div>
          <div>
            <div className="tibi-box clear">
              <div className="biaoji">
                1
              </div>
              <div className="fengexian">

              </div>
              <div className="content">
                <div><FormattedMessage id="identity_authentication" defaultMessage={'身份认证'} /></div>
                <div><FormattedMessage id="Completing_personal_certification" defaultMessage={'完成个人认证有助于保护账户安全，提高提现额度及交易权限'} /></div>
              </div>
              {
                (() => {
                  if (tibirenzheng.identity_auth == "0") {
                    return (<div className="renzheng" onClick={() => history.push("/personal/grsecurity/index")}>
                      <FormattedMessage id="De_certification" defaultMessage={'去认证'} />
                    </div>)
                  } else {
                    return <div className="bangding">
                      <FormattedMessage id="Certified" defaultMessage={'已认证'} />
                    </div>
                  }
                })()
              }

            </div>
            <div className="tibi-box clear">
              <div className="biaoji">
                2
              </div>
              <div className="fengexian">

              </div>
              <div className="content">
                <div><FormattedMessage id="Set_SMS" defaultMessage={'设置短信'} /></div>
                <div><FormattedMessage id="Used_to_collect_verification_information" defaultMessage={'提币、修改密码和安全设置时用以收取验证信息'} /></div>
              </div>
              {
                (() => {
                  if (tibirenzheng.short_msg_auth == "0") {
                    return <div className="renzheng" onClick={() => history.push('/personal/security/szphone')}>
                      <FormattedMessage id="To_set_up" defaultMessage={'去设置'} />
                    </div>
                  } else {
                    return <div className="bangding">
                      <FormattedMessage id="Set_up_ed" defaultMessage={'已设置'} />
                    </div>
                  }
                })()
              }


            </div>
            {/* <div className="tibi-box clear">
              <div className="biaoji">
                3
              </div>
              <div className="fengexian">

              </div>
              <div className="content">
                <div>绑定邮箱</div>
                <div>邮箱用于登录、提币及安全设置时使用、激活后不可修改</div>
              </div>

              {
                (() => {
                  if (tibirenzheng.mail_auth == "0") {
                    return <div className="renzheng" onClick={() => history.push('/personal/security/szemail')}>
                      去绑定
                  </div>
                  } else {
                    return <div className="bangding">
                      已绑定
                    </div>
                  }
                })()
              }
            </div> */}
            <div className="tibi-box clear">
              <div className="biaoji">
                3
              </div>
              <div className="fengexian">

              </div>
              <div className="content">
                <div><FormattedMessage id="Setting_up_fund_password" defaultMessage={'设置资金密码'} /></div>
                <div><FormattedMessage id="Use_in_dealing_and_withdrawing_money" defaultMessage={'交易、提币时使用'} /></div>
              </div>
              {
                (() => {
                  if (tibirenzheng.short_msg_auth == "1" && tibirenzheng.identity_auth == "1") {
                    if (tibirenzheng.fund_pwd_auth == "0") {
                      return <div className="renzheng" onClick={() => history.push('/personal/security/zjpass')}>
                        <FormattedMessage id="To_set_up" defaultMessage={'去设置'} />
                      </div>
                    } else {
                      return <div className="bangding">
                        <FormattedMessage id="Set_up_ed" defaultMessage={'已设置'} />
                      </div>
                    }
                  } else {
                    return <div className="panduan">
                      {/* <FormattedMessage id="Please_complete_step_2_first" defaultMessage={'请先完成步骤2'} /> */}
                      请先完成以上步骤
                    </div>
                  }
                })()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Tibiyang;