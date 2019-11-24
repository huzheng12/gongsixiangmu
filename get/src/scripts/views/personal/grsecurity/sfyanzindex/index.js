import React, { Component } from 'react';
import Biaoti from '../../componetn/biaoti';
import './index.scss'
import { api } from '@/utils/api.js'
import axios from '@/utils/ajax'
import { history } from '@/utils/history'
import lang from '@/utils/language';
import { Select, Input, Button, message } from 'antd';
import { Xfn } from '../../../../../utils/axiosfn';

const { Option } = Select;
class GrSecurtiyindex extends Component {
  constructor() {
    super()
    this.state = {
      tiele: lang().please_fill_in_it_truthfully + "..",
      tou: lang().Personal_authentication,
      username: "",
      sfzjhm: "",
      gj: lang().China,
      butFlg: true,
      gwbutFlg: true,
      area: [],
      gjFlg: true,
      wgusername: "",
      wgsfzjhm: "",
      wgsfzjhmx: "",
    }
  }
  componentDidMount() {
    const obj = {
      time: new Date().getTime().toString()
    }
    Xfn({
      _u: "aqguci",
      _m: "post",
      _p: {
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0 && res.data.data.real_name_auth == "1") {
        history.push('/personal/grsecurity/yz')
      }
    })

    Xfn({
      _u: "area",
      _m: "post",
      _p: obj
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  guojixuanze = (value) => {
    this.setState({
      gj: value,
      gjFlg: value === lang().China ? true : false
    })
  }
  username = (val) => {
    if (val.target.value !== "" && this.state.sfzjhm !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      username: val.target.value
    })
  }
  sfzjhm = (val) => {
    if (this.state.username !== "" && val.target.value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      sfzjhm: val.target.value
    })
  }
  sbmittij = () => {
    if (this.state.gj === lang().China) {
      const obj = {
        id_num: this.state.sfzjhm,
        nationality: this.state.gj,
        real_name: this.state.username,
        time: new Date().getTime().toString()
      }
      Xfn({
        _u: "realname_auth",
        _m: "post",
        _p: obj
      }, (res, code) => {
        if (code == 0) {
          history.push("/personal/grsecurity/yz")
        }
      })
    } else {
      const obj = {
        id_num: this.state.wgusername,
        nationality: this.state.gj,
        id_type: "1",
        surname: this.state.wgsfzjhmx,
        name: this.state.wgsfzjhm,
        time: new Date().getTime().toString()
      }
      Xfn({
        _u: "realname_auth_other",
        _m: "post",
        _p: obj
      }, (res, code) => {
        if (code == 0) {
          history.push("/personal/grsecurity/yz")
        }
      })
    }
  }
  // 国外
  wgusername = (val) => {
    if (this.state.wgsfzjhm !== "" && val.target.value !== "" && this.state.wgsfzjhmx !== "") {
      this.setState({
        gwbutFlg: false
      })
    } else {
      this.setState({
        gwbutFlg: true
      })
    }
    this.setState({
      wgusername: val.target.value
    })
  }
  wgsfzjhm = (val) => {
    if (this.state.wgusername !== "" && val.target.value !== "" && this.state.wgsfzjhmx !== "") {
      this.setState({
        gwbutFlg: false
      })
    } else {
      this.setState({
        gwbutFlg: true
      })
    }
    this.setState({
      wgsfzjhm: val.target.value
    })
  }
  wgsfzjhmx = (val) => {
    if (this.state.wgusername !== "" && val.target.value !== "" && this.state.wgsfzjhm !== "") {
      this.setState({
        gwbutFlg: false
      })
    } else {
      this.setState({
        gwbutFlg: true
      })
    }
    this.setState({
      wgsfzjhmx: val.target.value
    })
  }
  wgguojixuanze = (val) => {

  }
  render() {
    const { tiele, tou, butFlg, area, gjFlg, gwbutFlg } = this.state
    return (
      <div className="grsecurtiy-warp">
        <Biaoti content={tiele} flg={true} title={tou}></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear" style={{ marginTop: 24 }}>
            <span>{lang().nationality}</span>
            <Select defaultValue={lang().China} style={{ width: 340 }} onChange={this.guojixuanze}>
              {
                area.map((item, index) => {
                  return (
                    <Option value={item.area_name} key={"aa" + index}>{item.area_name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "block" : "none" }}>
            <span>{lang().Full_name}</span>
            <Input onChange={this.username} placeholder={lang().Please_enter_your_name} style={{ width: 340, height: 42 }} />
          </div>

          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "block" : "none" }}>
            <span>{lang().ID_number}</span>
            <Input onChange={this.sfzjhm} placeholder={lang().Please_enter_your_ID_number} style={{ width: 340, height: 42 }} />
          </div>
          {/* 国外 */}
          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "none" : "block" }}>
            <span>{lang().Document_type}</span>
            <Select defaultValue="护照" style={{ width: 340 }} onChange={this.wgguojixuanze}>
              <Option value="护照 " >{lang().passport} </Option>
              <Option value="驾驶证" >{lang().Drivers_license}</Option>
            </Select>
          </div>
          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "none" : "block" }}>
            <span>证件号码</span>
            <Input onChange={this.wgusername} placeholder="请输入证件号码" style={{ width: 340, height: 42 }} />
          </div>

          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "none" : "block" }}>
            <span>名</span>
            <Input onChange={this.wgsfzjhm} placeholder="请输入证件上的名字" style={{ width: 340, height: 42 }} />
          </div>
          <div className="lebal clear" style={{ marginTop: 12, display: gjFlg ? "none" : "block" }}>
            <span>姓</span>
            <Input onChange={this.wgsfzjhmx} placeholder="请输入证件上的姓氏(没有可不填)" style={{ width: 340, height: 42 }} />
          </div>
          <span className="lebal clear" style={{ width: 340, marginTop: 8, display: gjFlg ? "none" : "block", marginLeft: 120 }}>
            请完整填写证件上的姓名信息，不要填错或遗漏，如果您所在的国家或地区没有姓氏，可以不填写
          </span>
          <Button onClick={this.sbmittij} disabled={this.state.gj === "中国" ? butFlg : gwbutFlg} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>提交审核</Button>
        </div>
      </div >
    );
  }
}

export default GrSecurtiyindex;