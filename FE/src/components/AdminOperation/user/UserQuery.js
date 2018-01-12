import React from "react";

import DialogModal from "../../modal/index";
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import qs from "qs";
import axios from "../../../request/index";
import "./index.less";
import queryColumnData from "./queryColumnData";
import UserQueryRes from "./UserQueryRes";
const FormItem = Form.Item;
const Option = Select.Option;

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);

            axios.get("http://localhost/rl/").then(function(data){
                console.log(data.data);
            }).catch(function(err){
                console.error(err)
            })
        });
    }

    // To generate mock Form.Item
    getFields() {
        const c = queryColumnData.length;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const children = [];
        for (let i = 0; i < c; i++) {
            if(queryColumnData[i].select){
                children.push(
                    <Col span={8} key={i}>

                        <FormItem {...formItemLayout} label={queryColumnData[i].col_name}>
                            {getFieldDecorator(queryColumnData[i].lb_for, {
                                rules: [{
                                    required: false
                                }]
                            })(

                            <Select placeholder={queryColumnData[i].placeholder} >
                                {queryColumnData[i].options.map((el, i)=>(
                                    <Option value={el.value} key={i}>{el.text}</Option>
                                ))}
                            </Select>
                            )}
                        </FormItem>
                    </Col>

                );
            }else{
            children.push(
                <Col span={8} key={i}>
                    <FormItem {...formItemLayout} label={queryColumnData[i].col_name}>
                        {getFieldDecorator(queryColumnData[i].lb_for)(
                            <Input placeholder={queryColumnData[i].placeholder} />
                        )}
                    </FormItem>
                </Col>
            );}
        }
        return children;
    }

    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={40}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

var UserQ = Form.create()(AdvancedSearchForm);
class UserQuery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedChkbx: []
        };
        this.checkboxSel = this.checkboxSel.bind(this);
        this.delUser = this.delUser.bind(this);
    }
    checkboxSel(selectedChkbx){
        this.setState({
            selectedChkbx
        })
    }

    delUser(){
        const user_ids = this.state.selectedChkbx;
        if(user_ids.length >= 1){
          DialogModal.confirm(
            "是否确认删除该批次用户",
            function(){
              axios.post("/userDel",
                qs.stringify({
                  request_id: "99",
                  user_ids: JSON.stringify(user_ids)
              })).
              then((data) => {
                data = data.data;
                console.log(data)
                if(data.resp_cd == "00"){
                  DialogModal.success(
                    data.resp_msg+":该批次用户已被删除",
                    function(){
                      window.location.reload();
                    }
                  );
                }else{
                  DialogModal.error("删除失败: 请稍后重试 或 询问网站管理员");
                }
              }).
              catch(function(err){
                console.error(err)
              });
            }
          );
        }else{
            DialogModal.warning("请至少选择一个用户!");
        }
    }

    render(){
        return(
            <div>
                <UserQ />
                <Button
                    type="primary"
                    size="large"
                    onClick={function(){window.location.href="#/usr-add"}}
                    style={{margin: "30px 20px"}}
                >
                    新增用户
                </Button>
                <Button
                    type="primary"
                    size="large"
                    onClick={this.delUser}
                    style={{margin: "30px 20px"}}
                >
                    批量删除用户
                </Button>
                <div className="search-result-list">
                    <UserQueryRes
                        checkboxSel={this.checkboxSel}
                    />
                </div>
            </div>
        )
    }
}

export default UserQuery;











