import React, { Component } from 'react';
import number_format from '../../../../utils/renyinumber';
import EventFN from '../../../../utils/eventfn';
import store from '../../../store';
import { pricenubkaicang, pricenubpingcangduo, pricenubpingcangkong } from '../../../action';
const ListOne = (props) => {
  function parice(b) {
    store.dispatch(pricenubkaicang(b))
    store.dispatch(pricenubpingcangduo(b))
    store.dispatch(pricenubpingcangkong(b))
  }
  const { item, heyuename, i, type } = props
  return <li>
    <span className="span_color" onClick={() => parice(item.price)}
      style={{ fontSize: 12, cursor: "pointer", width: sessionStorage.userInfo ? "50%" : '' }}>
      {
        EventFN.CurrencyDigitLimit({
          heyuename: heyuename,
          content: item.price
        })
      }&emsp;</span>
    <span style={{ fontSize: 12, paddingRight: 15, width: sessionStorage.userInfo ? "50%" : '' }} className={
      item.color_size == 1 ? "section-red1 bg-change-red" :
        item.color_size == 2 ? "section-red1 bg-change-green" :
          item.color_size == 11 ? "section-red1 bg-change-reds" :
            item.color_size == 22 ? "section-red1 bg-change-greens" :
              "section-red1"
    }>
      {
        number_format(item.size, 0, ".", ",")
      }
    </span>
    {
      !sessionStorage.userInfo ? <span className="wudi" style={{ width: "38%" }}>
        <div style={{
          height: 20, width: item.bgcolor * 100 + '%',
          backgroundColor: type == "1" ? i % 2 == 0 ? "rgba(140,42,42,.3)" : "rgba(140,42,42,.15)"
            : i % 2 == 0 ? "rgba(38,153,78,.3)" : "rgba(38,153,78,.15) "
        }}></div>
        <div className="w">
          {number_format(item.ljl, 0, ".", ",")}&emsp;
      </div>
      </span> : ""
    }
  </li>
}

export default ListOne;