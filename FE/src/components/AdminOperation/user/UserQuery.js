import React from "react";

import DialogModal from "../../modal/index";
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
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
        this.updUser = this.updUser.bind(this);
    }
    checkboxSel(selectedChkbx){
        this.setState({
            selectedChkbx
        })
    }
    updUser(){
        const selectedChkbx = this.state.selectedChkbx;
        if(selectedChkbx.length == 1 && selectedChkbx[0]>=0){
            window.location.href=
              "\/#\/usr-add?"+
              window.btoa("user_id="+selectedChkbx[0]+"&random="+
                Math.random().toString().replace(".", "").substring(1,6));
        }else{
            DialogModal.warning({
                title: "警告",
                content: "每次只能选择一个用户进行信息变更"
            });
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
                    onClick={this.updUser}
                    style={{margin: "30px 20px"}}
                >
                    修改用户
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











