import React, { Component } from 'react';
import './index.scss'
import { Input, Select, Table, Button } from 'antd';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { timehuansuan } from '../../../../utils/time';
import { dangqianchipang } from '@/utils/dangqianchipang'
import { Tanchuang } from '../../../components/tanchuan';
import { connect } from "react-redux";
import { Xfn } from '../../../../utils/axiosfn';
import _processingFn from '../historyFn';
const { Option } = Select;
@connect(
  state => {
    return {
      tiaozhuanzijinhuanzhuan: state.datum.tiaozhuanzijinhuanzhuan,
    }
  }
)
class Huazhuan extends Component {
  constructor() {
    super()
    this.state = {
      kzslGTC: "",//数量input框value值
      tank: false,
      zxhzzhanghuname: "BTC",//当前的币种 种类   
      current_page: "1",
      page_size: "20",
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2",
      columns: [
        {
          title: <FormattedMessage id="Translated_currency" defaultMessage={'划转币种'} />,
          dataIndex: 'asset',
          // width: 400,
          align: "",
          render: text => <span className="huazhuan-table-tr" > {text}</span >,
        },
        {
          title: <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />,
          dataIndex: 'qty',
          render: text => <span className="huazhuan-table-tr" >{text}</span>

        },
        {
          title: <FormattedMessage id="Transfer_from" defaultMessage={'划转自'} />,
          dataIndex: 'from_account',
          render: text => <span className="huazhuan-table-tr" >{
            text == "1" ? <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /> :
              text == "2" ? <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /> :
                <FormattedMessage id="Spot_account" defaultMessage={'现货账户'} />
          }</span>,
        },
        {
          title: <FormattedMessage id="Transfer_to" defaultMessage={'划转至'} />,
          dataIndex: 'to_account',
          render: text => <span className="huazhuan-table-tr" >{
            text == "1" ? <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /> :
              text == "2" ? <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /> :
                <FormattedMessage id="Spot_account" defaultMessage={'现货账户'} />
          }</span>,

        },
        {
          title: <FormattedMessage id="Transfer_time" defaultMessage={'划转时间'} />,
          dataIndex: 'ctime',
          render: text => <span className="huazhuan-table-tr" >
            {timehuansuan(text).date}
            &ensp;
            {timehuansuan(text).dates}
          </span>
        },
        {
          title: <FormattedMessage id="Transition_state" defaultMessage={'划转状态'} />,
          align: "right",
          dataIndex: 'status',
          render: text => <span className="huazhuan-table-tr" >
            {
              text == "1" ? <FormattedMessage id="Successful_transfer" defaultMessage={'划转成功'} /> :
                <FormattedMessage id="Transfer_failure" defaultMessage={'划转失败'} />
            }</span>,
        },
      ],
      data: [],
      imgArr: {
        ioo: require("../../../img/nothing_data.png"),
      },
      available: "",
      butflg: true,
      symbol: [],
      lishilength: '',
      current_page: 1,//当前页数  切换页数的时候需要对比
      availables: '',

    }
  }
  hzavailablehis = (_data, fn) => {
    Xfn({
      _u: "hzavailable",
      _m: "get",
      _p: {
        asset: _data.asset,
        from_account: _data.from_account ? _data.from_account : "1",
        time: new Date().getTime().toString(),
      }
    }, (res, code) => {
      if (code == 0) {
        const butflg = res.data.data.available === "0" ? true : false
        this.setState({
          available: res.data.data.available,
          availables: res.data.data.available,
          butflg,
        })
        if (fn) {
          fn()
        }
      }
    })
  }
  cczxquery_history = (_data) => {
    _processingFn.cbquery_historyFn({
      _this: this,
      _data: _data,
      _url: "cczxquery_history",
      _type: 2
    }, (_res) => {
      this.setState({
        data: _res.rows,
        lishilength: _res.total
      })
    })
  }
  componentDidMount() {
    Xfn({
      _u: "symbolbizhongleixing",
      _m: "get",
      _p: {
        time: new Date().getTime().toString(),
      }
    }, (res, code) => {
      if (code == 0) {
        var _asset = this.props.tiaozhuanzijinhuanzhuan ? this.props.tiaozhuanzijinhuanzhuan : res.data.data.asset_list[0].asset
        this.setState({ symbol: res.data.data.asset_list, zxhzzhanghuname: _asset })
        this.hzavailablehis(
          {
            asset: _asset,
            from_account: this.state.zjzhfangxiang
          }
        )
        this.cczxquery_history(
          {
            asset: _asset
          }
        )
      }
    })
  }
  fenyed = (val) => {
    this.cczxquery_history({
      current_page: val
    })
    this.setState({
      current_page: val
    })
  }
  kzslGTC = (e) => {
    const n = 8
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    if (value * 1 > this.state.availables * 1) {
      this.setState({
        kzslGTC: this.state.availables,
        tank: false
      })
      return false
    }
    this.setState({
      kzslGTC: value,
      tank: false
    })
    if (!value) {
      this.setState({
        available: this.state.availables,
      })
    }
  }
  // 提交订单
  aisoxtikjd = () => {
    if (!this.state.kzslGTC) { return this.setState({ tank: true }) }
    Xfn({
      _u: "transfer",
      _m: "post",
      _p: {
        asset: this.state.zxhzzhanghuname,
        from_account: this.state.zjzhfangxiang,
        to_account: this.state.zjzhfangxiangchu,
        qty: this.state.kzslGTC,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          kzslGTC: ""
        })
        this.hzavailablehis({
          asset: this.state.zxhzzhanghuname,
          from_account: this.state.zjzhfangxiang,
        })
        this.cczxquery_history()
      }
    }, lang().Successful_transfer)
  }
  zxhzzhanghu = (val) => {
    this.cczxquery_history({
      asset: val
    })
    this.hzavailablehis({
      asset: val
    })
    this.setState({
      zxhzzhanghuname: val,
      kzslGTC: "",
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2",
    })
  }
  zjzhfangxiang = (val) => {
    this.setState({
      kzslGTC: ""
    })
    if (val == "1") {
      this.setState({
        zjzhfangxiang: val,
        zjzhfangxiangchu: "2"
      })
    } else {
      this.setState({
        zjzhfangxiang: val,
        zjzhfangxiangchu: "1"
      })
    }
    this.hzavailablehis({
      asset: this.state.zxhzzhanghuname,
      from_account: val,
    })
  }
  zjzhfangxiangchu = (val) => {
    this.setState({
      kzslGTC: ""
    })
    let a
    if (val == "1") { a = "2" }
    if (val == "2") { a = "1" }
    this.hzavailablehis({
      asset: this.state.zxhzzhanghuname,
      from_account: a,
    }, () => {
      if (val == "1") {
        this.setState({
          zjzhfangxiangchu: val,
          zjzhfangxiang: "2"
        })
      } else {
        this.setState({
          zjzhfangxiangchu: val,
          zjzhfangxiang: "1"
        })
      }
    })
  }
  qquanbuhuaz = () => {
    if (this.state.zjzhfangxiang == "1") {
      if (this.state.available > 0) {
        this.setState({
          available: "0",
          kzslGTC: this.state.available,
          tank: false
        })
      }
    } else {
      if (this.state.available > 0) {
        this.setState({
          available: "0",
          kzslGTC: this.state.available,
          tank: false
        })
      }
    }
  }
  render() {
    const {
      columns,
      data,
      kzslGTC,
      available,
      symbol,
      butflg,
      lishilength,
      tank,
      zxhzzhanghuname,
    } = this.state
    return (
      <div className="huazhuan-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} /></h1>
        </div>
        <div className="chongbi-content clear">
          <div className="chongbi-p p1 clear" style={{ height: 42 }}>
            <p>
              <FormattedMessage id="currency" defaultMessage={'币种'} />
            </p>
            <Select value={zxhzzhanghuname} style={{ width: 340, height: 42 }} onChange={this.zxhzzhanghu}>
              {
                symbol.map((item, index) => {
                  return <Option value={item.asset} key={item + "ads54" + index}>
                    {item.asset}
                  </Option>
                })
              }
            </Select>
          </div>
          <div className="chongbi-p clear">
            <p style={{ float: "left", lineHeight: "42px" }}>
              <FormattedMessage id="Turn_the_direction" defaultMessage={'划转方向'} />
            </p>
            <Select defaultValue="1"
              value={this.state.zjzhfangxiang}
              style={{ width: 130, height: 42, float: "left" }}
              onChange={this.zjzhfangxiang}>
              <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
            </Select>
            <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}><FormattedMessage id="Transfer" defaultMessage={'划转'} /></span>
            <Select defaultValue="2"
              style={{ width: 130, height: 42, float: "left" }} value={this.state.zjzhfangxiangchu} onChange={this.zjzhfangxiangchu}>
              <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
            </Select>
          </div>
          <div className="chongbi-p clear">
            <p>
              <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />
            </p>
            <Input value={kzslGTC} onChange={this.kzslGTC} style={{ width: 340, height: 42 }} />
            {(() => {
              if (tank) {
                return <Tanchuang content={lang().Please_enter_quantity} top={9} left={133}></Tanchuang>
              }
            })()}
          </div>
          <div className="chongbi-p clear kkkz" >
            <FormattedMessage id="Convertible_Quantity" defaultMessage={'可转数量'} />：
            <span style={{ color: "#333" }}>
              {available}
            </span>
            <span onClick={this.qquanbuhuaz} style={{ cursor: 'pointer' }} className="span-quanbu">
              <FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} />
            </span>
          </div>
          <div className="clear">
            <Button disabled={butflg} type="primary" onClick={this.aisoxtikjd}><FormattedMessage id="confirm" defaultMessage={'确认'} /></Button>
          </div>
          <div className="tble-box">
            <span className="tble-span-title">
              {zxhzzhanghuname}<FormattedMessage id="Transcription_Record" defaultMessage={'划转记录'} />
            </span>
            <Table pagination={{  // 分页
              simple: true,
              hideOnSinglePage: true,
              total: lishilength,
              pageSize: 20,
              onChange: this.fenyed,
            }} style={{ marginTop: 20 }} columns={columns} dataSource={data} />

            {dangqianchipang(data.length)}
          </div>
        </div>

      </div>
    );
  }
}
export default Huazhuan;