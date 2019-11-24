import React, { Component } from 'react';
import EventFN from '../../../../utils/eventfn';
import { Spin } from 'antd';
import ListOne from './listOne';
var scrollBar_switch = true;
class ListOnTheRight extends Component {
  constructor() {
    super()
  }
  imgdongtaijia = () => {
    const { instrument, imgArr } = this.props
    if (instrument && instrument.flgz == "1") {
      return imgArr.jt4
    }
    if (instrument && instrument.flgz == "0") {
      return imgArr.jt2
    }
    if (instrument && instrument.flgz == "10") {
      return imgArr.jt3
    }
    if (instrument && instrument.flgz == "20") {
      return imgArr.jt1
    }
  }
  componentDidMount() {
    var scrollBar = document.getElementById('scrollBara');
    if (scrollBar_switch && scrollBar.scrollTop === 0) {
      scrollBar.scrollTop = (scrollBar.scrollHeight - scrollBar.clientHeight) / 2;
    } else {
      scrollBar_switch = false
    }
  }
  componentDidUpdate() {
    var scrollBar = document.getElementById('scrollBara');
    if (scrollBar_switch && scrollBar.scrollTop === 0) {
      scrollBar.scrollTop = (scrollBar.scrollHeight - scrollBar.clientHeight) / 2;
    } else {
      scrollBar_switch = false
    }
  }
  render() {
    const {
      heyuename, imgArr, price, orderBookL2_25obj, instrument
    } = this.props
    return (
      <div className="g-scrollbar" id="scrollBara" style={{
        overflowY: "auto", height: 327
      }}>
        <ul className="ul-a1 g-scrollbar" style={{ minHeight: 120 }}>
          {
            instrument.index_price || orderBookL2_25obj.arrAsks.length > 0 || orderBookL2_25obj.arrBids.length > 0 ? orderBookL2_25obj.arrAsks.map((item, i) => {
              if (i < 15) {
                return <ListOne type="1" price={price} key={item + i} item={item} heyuename={heyuename}></ListOne>
              }
            }) : <Spin />
          }
        </ul>
        <div className="section-titlt ul-a2" style={{ height: 46 }}>
          <p style={{
            color: instrument.change_rate_24h >= 0 ? "rgba(38, 153, 78, 1)" : "#EE6560"
            , whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 900
          }}>
            {EventFN.CurrencyDigitLimit({
              content: instrument.last_price,
              type: 1
            })
            }
            <img src={this.imgdongtaijia()} alt="" />
          </p>
          <div className="section-titless">
            <li style={{ height: 24 }}>
              <div style={{
                fontSize: 12, color: "rgba(153,149,145,1)", whiteSpace: 'nowrap',
                textOverflow: 'ellipsis', overflow: 'hidden'
              }}>{
                  EventFN.CurrencyDigitLimit({
                    content: instrument.index_price,
                  })
                }</div>
              <img src={imgArr.xian} alt="" />
            </li>
            <span></span>
            <li style={{ height: 24 }}>
              <img src={imgArr.biao} alt="" />
              <div style={{
                fontSize: 12, color: "#4D4D4D",
                whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
              }}>{
                  EventFN.CurrencyDigitLimit({
                    content: instrument.mark_price
                  })
                }</div>
            </li>
          </div>
        </div>
        <ul className="ul-a2 ul_a3" style={{ minHeight: 100 }}>
          {
            instrument.index_price || orderBookL2_25obj.arrAsks.length > 0 || orderBookL2_25obj.arrBids.length > 0 ? orderBookL2_25obj.arrBids.map((item, i) => {
              if (i < 15) {
                return <ListOne key={item + i} price={price} item={item} i={i} heyuename={heyuename}></ListOne>
              }
            }) : <Spin />
          }
        </ul>
      </div>
    );
  }
}

export default ListOnTheRight;

