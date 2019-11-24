import React, { Component } from 'react';
import './index.scss'

export const Tanchuang = (props) => {
  const {
    type
  } = props
  return (
    <div className="Tanchuang-box" style={{ top: props.top, left: props.left }}>
      {(() => {
        if (type != 1) {
          return (
            <div className="jiantou">

            </div>
          )
        }
      })()}
      <div className="cantent">
        {props.content}
      </div>
    </div>
  )
}