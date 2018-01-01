import React from "react";
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';
import axios from "axios";
import DialogModal from "../../modal/index";

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        let data = this.props.location.search;
        let isUpdate = false;
        data = parseInt(data.substr(1,).split("=")[1]);

        if(data>0 && ((data | 0)===data)){
            console.log(data);
            isUpdate = true;
            let th = this;
            axios.get("linkUpdate.json", "").then(function(data){
                console.log(data.data);
                let d = data.data;
                d.category = d.category.split("_")[0];
                d.link_icon_url = d.link_icon_url.split("_")[0];
                th.props.form.setFieldsValue({
                    name: d.name,
                    link: d.link,
                    category_id: d.category,
                    description: d.description,
                    icon_id: d.link_icon_url
                });
            })
        }

        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            isUpdate
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }

                console.log('Received values of form: ', values);
                axios.get("../../../src/server/userAdd.json", values)
                    .then(function(data){
                        console.log(data);
                        DialogModal.confirm({
                            title: "成功",
                            content: "是否跳转到首页",
                            func: function(){
                                window.location.href = "/";
                            },
                            funcR: function(){

                            }
                        })

                    }).catch(function(err){
                    console.error(err);
                })
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{height:"20px"}}></div>
                <FormItem
                    {...formItemLayout}
                    label="链接名称"
                >
                    {getFieldDecorator('name', {
                        rules: [ {
                            required: true, message: '必填字段!',
                        }],
                    })(
                        <Input placeholder="请输入连接名称" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="链接地址(URL)"
                >
                    {getFieldDecorator('link', {
                        rules: [{
                            required: true, message: '必填字段!',
                        }],
                    })(
                        <Input
                            placeholder="请输入您喜爱的链接地址"
                            readOnly={this.state.isUpdate? true: false}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="链接描述"
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false, message: '必填字段!',
                        }],
                    })(
                        <Input placeholder="请对您所添加的链接写一点介绍" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属大类"
                    hasFeedback
                >
                    {getFieldDecorator('category_id', {
                        rules: [
                            { required: true, message: '必填字段!' },
                        ],
                    })(
                        <Select placeholder="请选择一个链接大类">
                            <Option value="1">China</Option>
                            <Option value="2">U.S.A</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="链接对应图标"
                    hasFeedback
                >
                    {getFieldDecorator('icon_id', {
                        rules: [
                            { required: true, message: '必填字段!' },
                        ],
                    })(
                        <Select placeholder="请选择一个图标">
                            <Option value="1">
                                China
                                <img
                                    style={{display:"block",width:"27px",float:"left"}}
                                    src="/logo.png"

                                />
                            </Option>
                            <Option value="2">U.S.A</Option>
                        </Select>
                    )}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const LinkAdd = Form.create()(RegistrationForm);

export default LinkAdd;