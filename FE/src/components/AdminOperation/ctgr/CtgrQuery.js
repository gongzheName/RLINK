import React from "react";

import DialogModal from "../../modal/index";
import { Form, Input, Button, Select, Modal } from 'antd';
import axios from "../../../request/index";
import qs from "qs";
import "./index.less";

import CtgrQueryRes from "./CtgrQueryRes";
const FormItem = Form.Item;
const Option = Select.Option;


class CtgrQuery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            selectedChkbx: []
        };
        this.checkboxSel = this.checkboxSel.bind(this);
        this.updUser = this.updUser.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    let th = this;

    let requestData = {};
    requestData.request_id="99";
    requestData.msg_body=JSON.stringify({
      name:document.getElementById("category_name").value
    });

    axios.post("/categoryAdd", qs.stringify(requestData))
      .then(function(data){
        th.setState({
          visible: false,
          confirmLoading: false,
        });
        if(data.data.resp_cd == "00"){
          DialogModal.info(
            "新增类别成功",
            function() {
              window.location.href = "#/ctgr-mng"
            })
        } else {
          DialogModal.error(data.data.resp_msg);
        }
      }).catch(function(err) {
        console.error(err)
      })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

    checkboxSel(selectedChkbx){
        this.setState({
            selectedChkbx
        })
    }

    updUser(){
        const selectedChkbx = this.state.selectedChkbx;
        axios.get("../../../src/server/userAdd.json", "").then(function(data){
            console.log(typeof data.data)

        }).catch(function(err){
            console.error(err)
        })
        if(selectedChkbx.length == 1 && selectedChkbx[0]>=0){
            window.location.href="/#/link-add?id=1";
        }else{
            DialogModal.warning({
                title: "警告",
                content: "每次只能变更一条记录"
            });
        }
    }

    render(){
      const formItemLayout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          },
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          },
        },
      };
      const { visible, confirmLoading } = this.state;
        return(
            <div>
              <Modal title="Title"
                visible={visible}
                maskClosable={false}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <FormItem { ...formItemLayout} label = "大类名称">
                  <Input placeholder="category_name" id="category_name" />
                </FormItem>
              </Modal>
                
                <Button
                    type="primary"
                    size="large"
                    onClick={this.showModal}
                    style={{margin: "30px 20px"}}
                >
                    新增大类
                </Button>
                <Button
                    type="primary"
                    size="large"
                    onClick={this.updUser}
                    style={{margin: "30px 20px"}}
                >
                    批量删除大类
                </Button>
                {<div className="search-result-list">
                    <CtgrQueryRes
                        checkboxSel={this.checkboxSel}
                    />
                </div>}
            </div>
        )
    }
}












export default CtgrQuery;