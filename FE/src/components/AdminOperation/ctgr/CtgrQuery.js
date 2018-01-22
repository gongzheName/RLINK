import React from "react";

import DialogModal from "../../modal/index";
import { Form, Input, Button, Select, Modal } from 'antd';
import axios from "../../../request/index";
import qs from "qs";
import "./index.less";

import CtgrQueryRes from "./CtgrQueryRes";
const FormItem = Form.Item;
const Option = Select.Option;

const ctgrAddUrl = "/admin/categoryAdd";
const ctgrUpdUrl = "/admin/categoryUpdate";


class CtgrQuery extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        visible: false,
        confirmLoading: false,
        selectedChkbx: []
      };
      this.checkboxSel = this.checkboxSel.bind(this);
      this.showModal = this.showModal.bind(this);
      this.showModalUpdate = this.showModalUpdate.bind(this);
      this.delCtgr = this.delCtgr.bind(this);
      this.handleOk = this.handleOk.bind(this);
      this.handleCancel = this.handleCancel.bind(this);

    }
  
  delCtgr() {
    const category_ids = this.state.selectedChkbx;
    if (category_ids.length >= 1) {
      DialogModal.confirm(
        "是否确认删除该批次大类",
        function() {
          axios.post("/admin/categoryDel",
            qs.stringify({
              request_id: "99",
              category_ids: JSON.stringify(category_ids)
            })).
          then((data) => {
            data = data.data;
            console.log(data)
            if (data.resp_cd == "00") {
              DialogModal.success(
                data.resp_msg + ":该批次大类已被删除",
                function() {
                  window.location.reload();
                }
              );
            } else {
              DialogModal.error("删除失败: 请稍后重试 或 询问网站管理员");
            }
          }).
          catch(function(err) {
            console.error(err)
          });
        }
      );
    } else {
      DialogModal.warning("请至少选择一条大类!");
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  showModalUpdate = (id, name) => {
    this.setState({
      visible: true,
      update:true,
      id,
      name
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

    let reqUrl=ctgrAddUrl;
    let msg="新增类别成功";
    if(this.state.update){
      reqUrl = ctgrUpdUrl;
      msg = "更新类别成功";
      requestData.msg_body=JSON.stringify({
        name:document.getElementById("category_name").value,
        id:th.state.id
      });
    }

    axios.post(reqUrl, qs.stringify(requestData))
      .then(function(data){
        th.setState({
          visible: false,
          confirmLoading: false,
        });
        if(data.data.resp_cd == "00"){
          DialogModal.info(
            msg,
            function() {
              window.location.reload();
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
                  <Input
                    defaultValue={this.state.name}
                    placeholder="category_name"
                    id="category_name"
                  />
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
                    onClick={this.delCtgr}
                    style={{margin: "30px 20px"}}
                >
                    批量删除大类
                </Button>
                {<div className="search-result-list">
                    <CtgrQueryRes
                        checkboxSel={this.checkboxSel}
                        showModalUpdate={this.showModalUpdate}
                    />
                </div>}
            </div>
        )
    }
}












export default CtgrQuery;