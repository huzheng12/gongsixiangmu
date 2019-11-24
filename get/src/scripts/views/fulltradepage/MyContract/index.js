import React, { Component } from 'react';
import Rand from './rand';
import Kaicang from '../../../components/kaicang';

const MyContract = (pro) => {

  const { } = pro.pro
  return (
    <div className="mycontract-warp">
        <div className="mycontract-warp-inner g-x-scrollbar">
          <div className="inner-box">
          <Rand props={pro.pro} ></Rand>
          <Kaicang></Kaicang>
          </div>
          
        </div>
        
    </div>
  );
}


export default MyContract;