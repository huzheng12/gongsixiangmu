import React, { Component } from 'react';
import './index.scss'
import Biaoti from '../componetn/biaoti';
import { dangqianchipang } from '@/utils/dangqianchipang'
import { message, Input, Button, Checkbox, Table, Modal } from 'antd';
import { timehuansuan } from '../../../../utils/time';
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
class Apiyemian extends Component {
  constructor() {
    super()
    this.state = {
      tou: "新建API",
      lishilength: "",
      apiModal: false,
      apiDeleteModal: false,
      cjbut: true,
      record: {},
      columns: [
        {
          title: '创建时间',
          dataIndex: 'ctime',
          align: 'left',
          width: 200,
          render: text => <div className="huazhuan-table-tr" >
            {timehuansuan(text).date}
            &ensp;
              {timehuansuan(text).dates}
          </div >,
        },
        {
          title: '名称',
          dataIndex: 'apiName',
          width: 160,
          render: text => <span className="huazhuan-table-tr" > {text}</span >,
        },
        {
          title: '权限',
          dataIndex: 'purview',
          width: 160,
          render: text => <span className="huazhuan-table-tr" > {text == "1" ? "读取" : "读取、交易"}</span >,
        },
        {
          title: '访问秘钥',
          dataIndex: 'apiKey',
          // width: 200,
          render: text => <span className="huazhuan-table-tr" > {text}</span >,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          render: text => <span className="huazhuan-table-tr" > {text == "1" ? '正常' : "已停用"}</span >,
        },
        {
          title: '操作',
          dataIndex: 'a',
          width: 100,
          align: 'right',
          render: (text, record) => <span className="huazhuan-table-tr" onClick={() => this.deleteFn(record)} style={{ cursor: 'pointer', color: "#E53F39" }}> 删除</span >,
        },

      ],
      data: [],
      apiname: "",
      purview: true,
      xiexia: false,
      abb: {}
    }
  }
  apiDeleteModalJ = () => {
    Xfn({
      _m: "post",
      _u: "apiremove",
      _p: {
        api_id: this.state.record.id,
        api_key: this.state.record.apiKey,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        this.apiqueryLenghis()
      }
    })
  }
  apiqueryLenghis = () => {
    Xfn({
      _u: 'apiquery',
      _m: "get",
      _p: {
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        const arrw = res.data.data.rows
        for (var i in arrw) {
          arrw[i].key = "qaz22" + i
        }
        this.setState({ data: res.data.data.rows, apiDeleteModal: false })
      }
    })
  }
  componentDidMount() {
    this.apiqueryLenghis()
  }
  deleteFn = (a) => {
    // console.log(a)
    this.setState({
      apiDeleteModal: true,
      record: a
    })
  }
  apiname = (val) => {
    console.log(val)
    if (val.target.value) {
      this.setState({
        apiname: val.target.value,
        cjbut: false
      })
    } else {
      this.setState({
        apiname: val.target.value,
        cjbut: true
      })
    }

  }
  duqu = (val) => {
    this.setState({
      purview: val.target.checked
    })
  }
  componentWillUnmount() {
    this.setState({ xiexia: false })
  }
  createapi = () => {
    if (this.state.apiname) {
      var purview = this.state.purview ? "2" : "1"
      Xfn({
        _u: "apicreate",
        _m: "post",
        _p: {
          time: new Date().getTime().toString(),
          api_name: this.state.apiname,
          purview
        }
      }, (res, code) => {
        if (code == 0) {
          this.setState({ abb: res.data.data, xiexia: true })
          this.apiqueryLenghis()
        }
      }, "创建成功")
    } else {
      openNotificationWithIcon("opne-warning", "警告", '不能为空')
    }
  }

  apiModalX = () => {
    this.setState({
      apiModal: false
    })
  }
  apiDeleteModalX = () => {
    this.setState({
      apiDeleteModal: false
    })
  }
  render() {
    const { tou, lishilength, columns, data, apiname, purview, apiModal, apiDeleteModal, cjbut, xiexia, abb, record } = this.state
    return (
      <div className="apiyemian-warp">
        <Biaoti flg={false} title={tou} ></Biaoti>
        <div className="content-box">
          <div className="lebal jiagejiange clear">
            <span>名称</span>
            <Input onChange={this.apiname} value={apiname} style={{ width: 340, height: 42 }} />
          </div>
          <div className="lebal clear">
            <span>权限设置</span>
            <Checkbox defaultChecked disabled >读取</Checkbox>
            <Checkbox style={{ marginLeft: 30, color: '#595959' }} checked={purview} onChange={this.duqu}>交易</Checkbox>
          </div>
          <div className="lebal butChuangjian clear" style={{ marginBottom: 10 }}>
            <Button disabled={cjbut} type="primary" onClick={this.createapi}>创建</Button>
          </div>
          <div className="lebal clear">
            <div className="wenzishuoming">
              <span>* GTE 为您提供了强大的API，您可以通过 API 使用行情查询、自动交易等服务。通过</span> <a href="https://gteapp.github.io/api/#introduction" target="view_window">
                API文档
                        </a><span>
                查看如何使用。
                <br />
                * 每个用户最多创建5组API Key
                        </span>
            </div>
          </div>
          {
            (() => {
              if (xiexia) {
                return <div className="xiexia">
                  <p className="p1">
                    请写下你的密钥
                  </p>
                  <p className="p2">
                    写下并好好保管！ 密钥在你离开本页后将不会再见到
                  </p>
                  <p className="p3">
                    Access Key
                  </p>
                  <p className="p4">
                    {abb.apiKey}
                  </p>
                  <p className="p3">
                    Secret Key
                  </p>
                  <p className="p4">
                    {abb.apiSecret}
                  </p>
                </div>
              }
            })()
          }

          <div className="h1-title">
            我的API Key
          </div>
          {/* showHeader={data.length != 0 ? true : false} */}
          {/* <Table columns={columns} dataSource={data} /> */}
          <Table
            pagination={{  // 分页
              hideOnSinglePage: true
            }}
            showHeader={data.length != 0 ? true : false}
            columns={columns} dataSource={data} showSizeChanger />
          {dangqianchipang(data.length)}
        </div>
        <Modal
          className="apiModal apiDeleteModal"
          title="删除API私钥？"
          visible={apiDeleteModal}
          onOk={this.apiDeleteModalJ}
          onCancel={this.apiDeleteModalX}
          cancelText="取消"
          okText="确定"
        >
          <div className="inp-box-p clear">
            {/* <Input placeholder="手机验证码" onChange={this.apiname} style={{ height: "100%" }} />
            <Button type="primary">获取验证码</Button> */}
            <div className="h3">
              此操作将永久删除 API 私钥。
            </div>
          </div>
          <div className="h5">
            <span>
              详情:
                </span>
            <span className="h5-span-2">
            </span>
          </div>
          <div className="h5">
            <span>
              名称：
                </span>
            <span className="h5-span-2">
              {record.apiName}
            </span>
          </div>
          <div className="h5">
            <span>
              Access Key：
                </span>
            <span className="h5-span-2">
              {record.apiKey}
            </span>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Apiyemian;