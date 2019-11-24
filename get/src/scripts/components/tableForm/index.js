import React, { Component } from 'react';
import { Table } from 'antd';
import './index.scss'
const TableForm = (props) => {
  const { columns, data, dataLength } = props
  return (
    <div className="tablefrom-warp">
      <Table pagination={{  // 分页
        hideOnSinglePage: true,
        total: dataLength,
        pageSize: 10,
        // onChange: this.huodongweituo
      }}
        columns={columns} dataSource={data}  />
    </div>
  );
}


export default TableForm;