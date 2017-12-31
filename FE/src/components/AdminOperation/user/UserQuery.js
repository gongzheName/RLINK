import React from "react";

import DialogModal from "../../modal/index";
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import axios from "axios";
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
            var xhr = new XMLHttpRequest();
            xhr.open("get", "/api", true);
            xhr.onreadystatechange = function(){
                if(xhr.status==200 && xhr.readyState==4){
                    console.log(xhr.responseText);
                }
            }
            xhr.send();
            /*axios.get("/api/column").then(function(data){
                console.log(data.data);
            }).catch(function(err){
                console.error(err)
            })*/
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
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

var UserQ = Form.create()(AdvancedSearchForm);
const UserQuery = () => (
    <div>
        <UserQ />
        <Button
            type="primary"
            size="large"
            onClick={function(){window.location.href="/#/usr-add"}}
            style={{margin: "30px 20px"}}
        >
            新增用户
        </Button>
        <Button
            type="primary"
            size="large"
            onClick={function(){window.location.href="/#/usr-add"}}
            style={{margin: "30px 20px"}}
        >
            修改用户
        </Button>
        <div className="search-result-list">
            <UserQueryRes />
        </div>
    </div>
)

export default UserQuery;











