import React from "react";
import { Carousel } from 'antd';



class Home extends React.Component{
    showImg(url){
        var frameid = 'frameimg' + Math.random();
        window.img = '<img id="img" style="width:auto;height:600px;border-radius:4px;" src=\'' + url + '?' + Math.random() + '\' /><script>window.onload = function() { parent.document.getElementById(\'' + frameid + '\').height = document.getElementById(\'img\').height+\'px\'; }<' + '/script>';
        document.write('<iframe id="' + frameid + '" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="100%" style="margin-top:-100px;margin-bottom:100px;"></iframe>');
    }
    render(){
        //this.showImg("http://img.hb.aicdn.com/51b26c4e07bf05b270ba9129c0ae956a34df8795f761a-nvb1SC_fw658");
        return(
            <div style={{width:"1002px",margin:"0 auto"}}>
                <div style={{textAlign:"center",width:600,height:"360px",marginTop:"20px",float:"left"}}>
                    <Carousel autoplay style={{}}>
                        <div>
                            <a>
                                <img
                                    style={{width: "100%"}}
                                    src="http://imgstore.cdn.sogou.com/app/a/11220002/4043_pc.jpg"
                                />
                            </a>
                        </div>
                        <div>
                            <a>
                                <img
                                    style={{width: "100%"}}
                                    src="http://img.bizhi.sogou.com/images/1366x768/2015/01/06/1034179.jpg"
                                />
                            </a>
                        </div>
                        <div>
                            <a>
                                <img
                                    style={{width: "100%"}}
                                    src="http://dl.bizhi.sogou.com/images/1366x768/2015/04/16/1147355.jpg"
                                />
                            </a>
                        </div>
                        <div>
                            <a>
                                <img
                                    style={{width: "100%"}}
                                    src="http://dl.bizhi.sogou.com/images/1366x768/2015/01/27/1063342.jpg"
                                />
                            </a>
                        </div>
                    </Carousel>
                </div>
                <div style={{float:"right",width:"300px",height:"300px",border:"1px solid red",marginTop:"20px"}}>
                    <ul>
                        <li>视频</li>
                        <li>音乐</li>
                        <li>开发</li>
                        <li>图片</li>
                        <li>软件</li>
                        <li>文档</li>
                        <li>新闻</li>
                        <li>门户网站</li>
                        <li>阅读</li>
                        <li>社交</li>
                        <li>更多分类（下拉菜单）</li>
                    </ul>
                </div>
                <div style={{clear:"both"}}></div>
                <div style={{width:"600px",height:100,border:"1px solid cyan",float:"left"}}></div>
                <div style={{width:"300px",height:100,border:"1px solid gold",float:"right"}}></div>
            </div>
        )
    }
}







export default Home;













/*let arr=[];

function rand() {
  return parseInt(Math.random()*100+1);
}

function randArr(n){
  let temp;
  for(let i=0;i<n;i++){
    arr.push(rand());
  }
}
randArr(10);

console.log("排序算法之快速排序---分治思想");
function sort_quick(arr, l, r) {
  let i=l, j=r, temp=arr[i];
  if(i<j){
    while(i<j && arr[i]<temp){
        i++;
        console.log(arr[i])
      }
      arr[j]=arr[i];
  }
  console.log(arr)
}

sort_quick(arr, 0, 9);*/








