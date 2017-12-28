import React from "react";

import { Modal, Button } from 'antd';

const DialogModal = {
    info: function(msg) {
        Modal.info({
            title: msg.title,
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    success: function(msg) {
        Modal.success({
            title: msg.title,
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    error: function() {
        Modal.error({
            title: msg.title,
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    warning: function() {
        Modal.warning({
            title: msg.title,
            content: (
                <div>
                    <p>{msg.content}</p>
                </div>
            ),
            onOk() {
                msg.func && msg.func();
            },
        });
    },
    confirm: function(msg) {
        Modal.confirm({
            title: msg.title,
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