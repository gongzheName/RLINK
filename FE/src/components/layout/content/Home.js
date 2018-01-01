import React from "react";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import "./index.less";

function callback(key) {
    console.log(key);
}

class Home extends React.Component{
    showImg(url){
        var frameid = 'frameimg' + Math.random();
        window.img = '<img id="img" style="width:auto;height:600px;border-radius:4px;" src=\'' + url + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
        document.write('<iframe id="' + frameid + '" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="100%" style="margin-top:-100px;margin-bottom:100px;"></iframe>');
    }
    render(){
        //this.showImg("http://img.hb.aicdn.com/51b26c4e07bf05b270ba9129c0ae956a34df8795f761a-nvb1SC_fw658");
        return(
            <div style={{textAlign:"center",marginTop:"20px"}}>
                <img
                    style={{width:"70%",height:"auto"}}
                    src="http://imgstore.cdn.sogou.com/app/a/11220002/4043_pc.jpg"
                />
                <div></div>
                <div className="image-caption">以上图片来自于网络</div>

            </div>
        )
    }
}







export default Home;