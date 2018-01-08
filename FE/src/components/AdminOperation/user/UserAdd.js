import React from "react";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    Upload,
    Radio,
    DatePicker
} from 'antd';
import moment from "moment";
import axios from "axios";
import qs from "qs";
import DialogModal from "../../modal/index";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        let data = this.props.location.search; //获取base64编码
        let isUpdate = false;
        data = window.atob(data.substr(1,)); //解析
        data = parseInt(data.split("=")[1]);

        if(data>0 && ((data | 0)===data)){
            isUpdate = true;
            let th = this;
            axios.get("userUpdate.json", "").then(function(data){
                console.log(data.data);
                let d = data.data;
                th.props.form.setFieldsValue({
                    birth: moment(d.birth, "YYYY-MM-DD"),
                    email: d.email,
                    gender: d.gender,
                    name: d.name,
                    nickname: d.nickname,
                    introduce: d.introduce,
                    phone: d.phone


                });
            })
        }

        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            isUpdate
        };
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return;
                }

                // Should format date value before submit.
                /*const values = {
                    ...fieldsValue,
                    'birth': fieldsValue['birth'].format('YYYY-MM-DD')
                };*/
                values.request_id = "99";
                console.log('Received values of form: ', values);
                axios.post("http://101.236.40.233/userAdd",
                    qs.stringify(values)).
                then(function(data){
                    DialogModal.info({
                        content: "用户新增成功！",
                        func: function(){
                            window.location.href = "#/usr-mng"
                        }
                    })
                }).catch(function(err){
                    console.error(err)
                })
                /*axios.get("../../../src/server/userAdd.json", values)
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
                })*/
            });
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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

        const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{height:"20px"}}></div>
                <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
                        <span style={{fontSize:"24px",color:"#108ee9"}}>
                            {this.state.isUpdate? "用户设置": "注册"}
                        </span>
                    </div>
                </div>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('name', {
                        rules: [ {
                            required: true, message: '请输入用户名!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密码"
                    style={{display: this.state.isUpdate?"none":"block"}}
                >
                    {this.state.isUpdate?null:getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    style={{display: this.state.isUpdate?"none":"block"}}
                >
                    {this.state.isUpdate?null:getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式不合法!',
                        }, {
                            required: false, message: '必填字段!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="性别："
                >
                    {getFieldDecorator('gender')(
                        <RadioGroup>
                            <Radio value="1">男</Radio>
                            <Radio value="2">女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="出生日期"
                >
                    {getFieldDecorator('birth', config)(
                        <DatePicker
                            format="YYYY-MM-DD"
                        />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              昵称&nbsp;
                            <Tooltip title="什么鬼?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [ {
                            required: false, message: '',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="自我介绍"
                >
                    {getFieldDecorator('introduce', {
                        rules: [ {
                            required: false, message: '',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="联系方式"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: false, message: 'Please input your phone number!' }],
                    })(
                        <Input style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="头像"
                    extra="图片大小限定在200KB以下"
                    style={{display: this.state.isUpdate?"none":"block"}}
                >
                    {this.state.isUpdate?null:getFieldDecorator('avatar', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="avatar" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> 点击上传图片
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <img style={{width:40}} src="http://www.qq1234.org/uploads/allimg/141211/092G942H-9.jpg" alt="" />

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const UserAdd = Form.create()(RegistrationForm);

export default UserAdd;