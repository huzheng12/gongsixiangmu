import React, { Component } from 'react';
import { Input, Button } from 'antd';

export const Input_A_B = (props) => {
  const { title, onChange, placeholder, avalue, type } = props
  return (
    <div className="lebal clear">
      <span>{title}</span>
      <Input onChange={onChange} type={type ? type : "text"} type="password" value={avalue} placeholder={placeholder} style={{ width: 340, height: 42 }} />
    </div>
  );
}


export const Input_A_B_C = (props) => {
  const { title, onChange, disabled, onClick, placeholder, butContent, sty, avalue } = props
  return (
    <div className="lebal clear">
      <span>{title}</span>
      <Input onChange={onChange} value={avalue} placeholder={placeholder} style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
      <Button disabled={disabled} onClick={onClick} type="primary" style={{ width: 130, height: 42, float: "left" }}>
        {butContent}
      </Button>
      {sty}
    </div>
  );
}

