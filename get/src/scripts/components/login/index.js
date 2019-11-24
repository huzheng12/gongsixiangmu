import React, { Component } from 'react';
import './index.scss'
import { Input, Select, Button } from 'antd';
const { Option } = Select;

const LoginPhoneEmail = (props) => {
  const { disabled, butOnClick, suffix, prefix, className, contentRivalPrice, phoneValue, phoneOnBule, valueErr, phoneOnFocus, type, placeholder, phoneOnChange, butName, yzmOnClick, butFlg } = props
  return (
    <div className={"login-warp-email " + className}>
      <div className="p-cow clear">
        {(() => {
          if (type == "1") {
            return <div className="select-box">
              <Select defaultValue="86" style={{ width: 110 }} onChange={props.handleChange}>
                {
                  props.area.map((item, index) => {
                    return (
                      <Option value={item.area_code} key={item + index}>+{item.area_code}</Option>
                    )
                  })
                }
              </Select>
            </div>
          }
        })()}
        <div className={type == "1" ? "input-box" : type == "0" ? "input-box1" : "input-boxs"} >
          <Input
            type={(() => {
              switch (type) {
                case "0": return "text"; //验证码
                case "1": return "text"; //手机区号
                case "2": return "password";
                case "3": return "text";
                case "4": return "text";
                default:
                  return "text";
                  break;
              }
            })()}
            placeholder={placeholder}
            style={{ borderColor: valueErr ? "#E53F39" : "", width: type == "1" ? "180px" : type == "4" || type == "5" ? "195px" : "100%" }}
            value={phoneValue}
            onChange={phoneOnChange}
            onBlur={phoneOnBule}
            disabled={disabled}
            prefix={prefix}
            suffix={suffix}
            onFocus={phoneOnFocus} />
        </div>
        {
          (() => {
            if (type == "0") {
              return <div className="but-box">
                <Button
                  disabled={!butFlg}
                  onClick={yzmOnClick}
                  style={{ float: "left", width: 110, height: 42 }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  {
                    butName
                  }
                </Button>
              </div>
            }
          })()
        }
        {
          (() => {
            if (type == "4" || type == "5") {
              return <div className="but-box">
                <Button
                  style={{ height: 42, float: "right", width: 70 }}
                  onClick={butOnClick}>
                  <span className="span-cos-2" style={{ borderBottom: "1px dashed rgba(153,149,145,1)" }}>
                    {contentRivalPrice}
                  </span>
                </Button>
              </div>
            }
          })()
        }
        {
          (() => {
            if (type == "5") return false
            if (valueErr) {
              return <div className="tishicuowu err-input">
                {valueErr}
              </div>
            } else {
              return <div className="tishicuowu">
              </div>
            }
          })()
        }
      </div>
    </div>
  );
}
export default LoginPhoneEmail;