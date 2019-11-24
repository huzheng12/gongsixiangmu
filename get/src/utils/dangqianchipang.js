import { NavLink } from "react-router-dom"
import React, { Component } from 'react';
// import {dangqianchipang} from '@/utils/dangqianchipang'

export const dangqianchipang = (a, b) => {
  //如果有b，就不需要登录也可以展示
  const ioo = require('../scripts/img/nothing_data.png')
  if (sessionStorage.userInfo || b) {
    if (a <= 0) {
      return <div className="tablemeishuju">
        <img src={ioo} alt="" />
        <div>
          您暂时还没有相关数据
          </div>
      </div>
    }
  } else {
    return <div className="tablemeishuju">
      <img src={ioo} alt="" />
      <div>
        您必须
       <NavLink style={{ margin: "0 5px" }} to="/login">登录</NavLink>
        才可以看到此信息
      </div>
    </div>
  }
}