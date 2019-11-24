import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Spin } from 'antd';
const ChengjiaoLiebiao = (props) => {
  // console.log(props, "props")
  return (
    <div className="chengjiao-warp-box">
      <div className="title-cd drag-handle">成交列表</div>
      <div className="chengjiao-td-spandiv clear">
        <div className="td"><FormattedMessage id="Price" defaultMessage={'价格'} /></div>
        <div className="td"><FormattedMessage id="Number" defaultMessage={'数量'} /></div>
        <div className="td">方向</div>
        <div className="td">时间</div>
      </div>
      <div className="table-fixa" >
        {
          props.pcaccoundtnumflg === 1 ? <div className="module-body g-scrollbar" dangerouslySetInnerHTML={{ __html: props.pcaccounddt }} /> : <Spin />
        }
      </div>
    </div>
  )
}

export default ChengjiaoLiebiao;