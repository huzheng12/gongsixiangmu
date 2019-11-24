import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
import _ from "lodash";
import './index.scss'
import Tvchart from '@/scripts/components/tvchart';
import { WidthProvider, Responsive } from "react-grid-layout";
import { objjj, wsreconnect, tokenfun, marketsquery, orderBookLfn, zhutiyanzheng } from '../../action';
import ContractDetails from './ContractDetails';
import MyContract from './MyContract';
import ChengjiaoLiebiao from './chengjiao';
import Weituoliebiao from './weituoliebao';
import TitleFullk from './titeFull';
import TableFoot from './tablefoot';
import { Xfn } from '../../../utils/axiosfn';
import Heeader from './titeFull/heerder';
import sendMessage from '../../../utils/ws_send_message';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  },
  dispatch => {
    return {
      tokenFun: (n, a) => dispatch(tokenfun(n, a)),
      wsrecOnnect: (a) => dispatch(wsreconnect(a)),
      obJjj: (a) => dispatch(objjj(a)),
      chongxinkaiqi: (a) => dispatch({ type: "chongxinkaiqi", chongxinkaiqi: a }),
    }
  }
)
class FullTradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }
  componentDidMount() {
    // localStorage.language = 'zh'
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = "theme-dark"
  }
  componentWillUnmount() {
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = localStorage.theme
  }
  componentDidUpdate() {
    if (this.props.ws_connect == 1 || this.props.isLogin == 1) {
      let options = sendMessage(this.props).obj
      if (window.wss.readyState === 1) {
        window.wss.send(JSON.stringify(options.instrument_all));
        window.wss.send(JSON.stringify(options.orderbookz));
        window.wss.send(JSON.stringify(options.trade));
        if (sessionStorage.userInfo) {
          window.wss.send(JSON.stringify(options.position_all));
          window.wss.send(JSON.stringify(options.pc_account));
          window.wss.send(JSON.stringify(options.order_all));
        }
      }
      this.props.wsrecOnnect(0)
      this.props.chongxinkaiqi(1)
    }
  }
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }
  resetLayout() {
    this.setState({ layouts: {} });
  }
  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }
  render() {
    const { pcaccounddt, instrument, pcaccoundtnumflg } = this.props
    return (
      <div className="fulltra-warp-d full-page">
        <Header></Header>
        <div className="ticker-info-box">
          <Heeader _props={this.props}></Heeader>
          <TitleFullk resetLayouts={this.resetLayout.bind(this)}></TitleFullk>
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableHandle=".drag-handle"
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="1" data-grid={{ w: 6, h: 11, x: 0, y: 0, i: "1", minW: 2, minH: 3 }} style={{ padding: 5 }}>
            <Tvchart></Tvchart>
          </div>
          <div key="2" data-grid={{ w: 3, h: 20, x: 6, y: 0, i: "2", minW: 2, minH: 3, }}>
            <Weituoliebiao></Weituoliebiao>
          </div>
          <div key="3" data-grid={{ w: 3, h: 20, x: 9, y: 0, i: "3", minW: 2, minH: 3, }}>
            <ChengjiaoLiebiao pcaccoundtnumflg={pcaccoundtnumflg} pcaccounddt={pcaccounddt} instrument={instrument}></ChengjiaoLiebiao>
          </div>
          <div key="4" data-grid={{ w: 2, h: 9, x: 0, y: 11, i: "4", minW: 2, minH: 8, }}>
            <ContractDetails></ContractDetails>
          </div>
          <div key="5" data-grid={{ w: 4, h: 9, x: 2, y: 11, i: "5", minW: 4, minH: 8, }}>
            <MyContract pro={this.props}> </MyContract>
          </div>
          <div key="6" data-grid={{ w: 12, h: 9, x: 0, y: 20, i: "6", minW: 2, minH: 3, }}>
            <TableFoot></TableFoot>
          </div>
        </ResponsiveReactGridLayout>
        <Footer></Footer>
      </div>
    );
  }
}

export default FullTradePage