import React, { Component } from 'react'
import './index.scss'
import store from '@/scripts/store.js'
import { history } from '@/utils/history'
import { Icon, Input, Button, Tooltip, notification, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Tabs } from 'antd';
import OrderPage from '../orderPage';
const { TabPane } = Tabs;
class Kaicang extends Component {
  callback = (key) => {
    this.setState({
      cabgkey: key,
      inputpair: "",
      flgduishoujia: false,
    })
  }
  render() {
    return (
      <div className="kaicang-box">
        <Tabs animated={false} defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={<FormattedMessage id="open_a_granary_to_provide_relief" defaultMessage={'开仓'} />} key="1">
            <OrderPage _type="1"></OrderPage>
          </TabPane>
          <TabPane tab={<FormattedMessage id="Close_a_position" defaultMessage={'平仓'} />} key="2">
            <OrderPage _type="2"></OrderPage>
          </TabPane>
        </Tabs>
      </div >
    )
  }
}

export default Kaicang