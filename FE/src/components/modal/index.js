import React from "react";

import { Modal } from 'antd';

const DialogModal = {
    info: function(msg, func) {
        Modal.info({
            title: "信息",
            content: (
                <div>
                    <p>{msg}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                func && func();
            },
        });
    },
    success: function(msg, func) {
        Modal.success({
            title: "成功",
            content: (
                <div>
                    <p>{msg}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                func && func();
            },
        });
    },
    error: function(msg, func) {
        Modal.error({
            title: "错误",
            content: (
                <div>
                    <p>{msg}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                func && func();
            },
        });
    },
    warning: function(msg, func) {
        Modal.warning({
            title: "警告",
            content: (
                <div>
                    <p>{msg}</p>
                </div>
            ),
            okText: '确认',
            onOk() {
                func && func();
            },
        });
    },
    confirm: function(msg, func, funcR) {
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
                func && func();
            },
            onCancel() {
                funcR && funcR();
            },
        });
    }
}

export default DialogModal;

