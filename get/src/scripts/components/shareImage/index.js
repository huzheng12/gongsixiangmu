import React, { Component } from 'react';
import './index.scss';
import QRCode from 'qrcode.react';
import LiCanvas from 'li-canvas';

class shareImage extends Component {
    constructor(props) {
        super()
        this.state = {
            Content: 'www.baidu.com/94HHH',
            bg_img_url: require('../../img/share_bg_img.png'),
            a_link_url: '',
            isdonwload: false,
            canvas: '',
        }
    }
    componentDidMount() {
        var canvas = new LiCanvas('mycanvas');
        var Qr = document.getElementById('qrid');
        let image = new Image();
        image.src = Qr.toDataURL("image/png");

        var bg = {
            src: this.state.bg_img_url,//或者图片的url地址
            x: 0,//左上角的x坐标
            y: 0,//左上角的y坐标
            width: 400,//图片绘制宽度
            height: 675,//图片绘制高度
            borderRadius: 0 //图片圆角半径
        }

        var qr = {
            src: image.src,//或者图片的url地址
            x: 281,//左上角的x坐标
            y: 555,//左上角的y坐标
            width: 100,//图片绘制宽度
            height: 100,//图片绘制高度
            borderRadius: 0 //图片圆角半径
        }
        canvas.addDrawImageTask(bg)
        canvas.addDrawImageTask(qr)
        canvas.draw()

    }
    ClickDownLoad = () => {
        var myImage = document.getElementById('mycanvas');
        var img = new Image();
        img.crossOrigin = 'Anonymous'
        img.src = myImage.toDataURL("image/png");
        var a_link = document.getElementById('aId');
        a_link.href = img.src;
        a_link.download = 'share_gte'

        let e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        a_link.dispatchEvent(e);

    }
    render() {
        console.log(this.props.addresse)
        return (
            <div className="tupianxiazai">
                <canvas id="mycanvas" width="400" height="675"></canvas>
                <QRCode id='qrid' value={this.props.addresse} size={100} />
                <a download id="aId" className="download-btn"></a>
            </div>
        )

    }
}

export default shareImage
