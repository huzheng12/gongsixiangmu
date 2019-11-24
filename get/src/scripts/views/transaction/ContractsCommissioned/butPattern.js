import React, { Component } from 'react';
import {
  Button,
} from 'antd';
class ButPattern extends Component {
  render() {
    return (
      <div>
        <Button className="button00155" type="primary" onClick={this.showModal} style={{ float: "left" }}>
          账号模式
          <div>
            {moshi !== "1" ? <FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /> : "全仓"}
          </div>
        </Button>
      </div>
    );
  }
}
export default ButPattern;


// 待定未引入