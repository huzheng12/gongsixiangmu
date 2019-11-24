import React, { Component } from 'react';
import './index.scss';
import { Input, Select } from 'antd';
const { Option } = Select;

const InputAnt = (props) => {
  const { area, phoneValue, phoneOnBule, valueErr, phoneOnFocus, type, placeholder, phoneOnChange } = props
  return (
    <div className="InputAnt-warp">
      {(() => {
        if (type == "1") {
          return <div className="select-box">
            <Select defaultValue="86" style={{ width: 110 }} onChange={props.handleChange}>
              {
                area.map((item, index) => {
                  return (
                    <Option value={item.area_code} key={item + index}>+{item.area_code}</Option>
                  )
                })
              }
            </Select>
          </div>
        }
      })()}
      <div className={type == "1" ? "input-box" : "input-boxs"} >
        <Input
          type={(() => {
            switch (type) {
              case "1": return "text"; break;
              case "2": return "password"; break;
              case "3": return "text"; break;
              default:
                return 0;
                break;
            }
          })()}
          placeholder={placeholder}
          style={{ borderColor: valueErr ? "red" : "", width: type == "1" ? "220px" : "100%" }}
          value={phoneValue}
          onChange={phoneOnChange}
          onBlur={phoneOnBule}
          onFocus={phoneOnFocus} />
      </div>
    </div>
  );
}



export default InputAnt;