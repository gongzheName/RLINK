import React from "react";

import { Modal, Button } from 'antd';

const DialogModal = {
    info: function(msg) {
        Modal.info({
            title: "信息",
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    success: function(msg) {
        Modal.success({
            title: "成功",
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    error: function(msg) {
        Modal.error({
            title: "错误",
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    warning: function(msg) {
        Modal.warning({
            title: "警告",
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    confirm: function(msg) {
        Modal.confirm({
            title: "询问",
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            okText: '确认',
            cancelText: '取消',
            onOk() {
                msg.func && msg.func();
            },
            onCancel() {
                msg.funcR && msg.funcR();
            },
        });
    }
}

function rand() {
    return parseInt(Math.random()*100+1);
}

console.log("排序算法之快速排序---分治思想");
function sort_quick(n) {
    let temp, arr = [];
    for(let i=0;i<n;i++){
        temp = rand();
        arr.push(temp);
        console.log(i+"+++"+arr[i]);
    }


    for(let i=0;i<n;i++){
        temp = arr[i];
        for(let j=0;j<n;j++){
            if(arr[j]<temp){
                arr[i] = arr[j];
                arr[j] = temp;
                break;
            }
        }
    }
    console.log(arr);
}

sort_quick(10);









export default DialogModal;

