import React, { Component } from 'react';
import './index.scss'
import { Link } from "react-router-dom"
import { history } from '@/utils/history'
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
let times
class Rechengg extends Component {
  constructor() {
    super()
    this.state = {
      chengg: require('../../../img/login/box_success.png'),
      nub: 3
    }
  }

  componentDidMount() {
    times = setInterval(() => {
      this.setState({
        nub: this.state.nub - 1
      })
      if (this.state.nub <= 0) {
        clearInterval(times)
        history.push("/transaction")
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  render() {
    const { chengg, nub } = this.state
    return (
      <div>
        <Header></Header>
        <div className="rechenggong-warp">
          <div className="box">
            <div className="title-img clear">
              <img src={chengg} alt="" />
            </div>
            <div className="wenzi">
              <p>
                注册成功，感谢您对GTE的信任！
              </p>
              <div className="wenzi-s">
                <span>{nub}s</span>
                <span>后自动跳转或</span>
                <Link to="/transaction">立即跳转</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}

export default Rechengg;