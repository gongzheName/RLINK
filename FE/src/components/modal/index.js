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

export default DialogModal;

