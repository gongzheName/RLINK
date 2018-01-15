import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import DialogModal from "../../modal/index";
const FormItem = Form.Item;

const users=[{name:"administer",password:"adminrlink"}];

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if((values.userName==users[0]["name"])&&
            (values.password==users[0]["password"])){
            localStorage.setItem("login", "success_local");
            localStorage.setItem("loginTimeStamp", new Date().getTime());
            window.location.reload();
        }else{
            DialogModal.error("用户名或密码有误！");
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="ant-row ant-form-item">
          <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-5">
            <span style={{fontSize:"24px",color:"#108ee9"}}>登录</span>
          </div>
        </div>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {/*{getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>*/}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或者 <a href="#/register">注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login;