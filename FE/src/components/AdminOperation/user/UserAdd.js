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
  DatePicker,
  Avatar
} from 'antd';
import moment from "moment";
import axios from "../../../request/index";
import qs from "qs";
import DialogModal from "../../modal/index";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const userAddUrl = "/userAdd";
const userUpdUrl = "/userUpdate";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    let user_id = this.props.location.search; //获取base64编码
    let isUpdate = false;
    user_id = window.atob(user_id.substr(1, )); //解析
    user_id = parseInt(user_id.split("=")[1]);

    if (user_id > 0 && ((user_id | 0) === user_id)) {
      isUpdate = true;
      let th = this;

      axios.post("/getUserById",
        qs.stringify({
          request_id: "99",
          user_id
        })).then(function(data) {
        let d = data.data.data[0]; //查询数据
        let param1 = d.birth; //日期格式化
        if (param1) {
          param1 = new Date(param1);
          let m = param1.getMonth();
          if (m < 9) {
            m = "0" + (m + 1);
          } else {
            m = m + 1;
          }
          param1 = param1.getFullYear() + "-" + m +
            "-" + param1.getDate();
          param1 = moment(param1, "YYYY-MM-DD");
        } else {
          param1 = null;
        }
        d.birth = param1;
        th.props.form.setFieldsValue({
          birth: d.birth,
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
      isUpdate,
      user_id
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
    let th = this;
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
        if (values.birth) {
          values = {
            ...fieldsValue,
            'birth': fieldsValue['birth'].format('YYYY-MM-DD')
          };
        }
        let tipmsg = "用户新增成功！",
          msg_body = values;
        if (th.state.user_id) {
          msg_body.id = th.state.user_id;
          tipmsg = "用户变更成功";
        }
        let request_data = {}; //传给后台的参数
        request_data.msg_body = JSON.stringify(msg_body);
        request_data.request_id = "99";

        let requestUrl = this.state.isUpdate ? userUpdUrl : userAddUrl;
        axios.post(requestUrl,
          qs.stringify(request_data)).
        then(function(data) {
          if (data.data.resp_cd == "00") {
            DialogModal.info(
              tipmsg,
              function() {
                window.location.href = "#/usr-mng"
              })
          } else {
            DialogModal.error(data.data.resp_msg);
          }
        }).catch(function(err) {
          console.error(err)
        })
      });
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
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
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      autoCompleteResult
    } = this.state;

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
      rules: [{
        type: 'object',
        required: false,
        message: 'Please select time!'
      }],
    };

    return (
      <Form onSubmit={this.handleSubmit} >
        <div style = {{height:"20px"}}> </div>
        <div className = "ant-row ant-form-item">
          <div className = "ant-form-item-label ant-col-xs-24 ant-col-sm-5" >
            <span style={{
                fontSize: "24px",
                color: "#108ee9"
              }}
            >
              {this.state.isUpdate ? "用户设置" : "注册"}
            </span>
          </div>
        </div>

        <FormItem
          { ...formItemLayout}
          label = "用户名"
        >
          {getFieldDecorator('name', {rules:[{
              required: true,
              message: '请输入用户名!',
            }]})(<Input/>)
          }
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = "密码"
          style = {{
              display: this.state.isUpdate ? "none" : "block"
          }}
        >
          {this.state.isUpdate? null: getFieldDecorator('password', {
            rules:[{
                required: true,
                message: '请输入密码!',
              },{
                validator: this.checkConfirm,
              }]})(<Input type = "password" />
            )}
        </FormItem>
        <FormItem
          { ...formItemLayout}
          label = "确认密码"
          style = {{
              display: this.state.isUpdate ? "none" : "block"
          }}
        >
          {this.state.isUpdate? null: getFieldDecorator('confirm', {
              rules: [{
                required: true,
                message: '请再次输入密码!',
              }, {
                validator: this.checkPassword,
              }]})(
                <Input
                  type = "password"
                  onBlur = {this.handleConfirmBlur}
                />
            )}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = "邮箱"
        >
          {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: '邮箱格式不合法!',
              }, {
                required: false,
                message: '必填字段!',
              }]})(<Input/>
            )}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = "性别："
        >
          {getFieldDecorator('gender')(
            <RadioGroup >
              <Radio value = "1" > 男 </Radio>
              <Radio value = "2" > 女 </Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = "出生日期"
        >
          {getFieldDecorator('birth', config)(
              <DatePicker format = "YYYY-MM-DD" />
          )}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = {(<span> 昵称 </span>)}
        >
          {getFieldDecorator('nickname', {
              rules: [{
                required: true,
                message: '请填写昵称',
              }]
          })( <Input/>)}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label = "自我介绍"
        >
          {getFieldDecorator('introduce', {
              rules: [{
                required: false,
                message: '',
              }]
          })(<Input />)}
        </FormItem>

        <FormItem
          { ...formItemLayout}
          label={(
            <span>
              联系方式 &nbsp;
              <Tooltip title="暂时只支持11位手机号填写">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('phone', {
              rules: [{
                required: false,
                message: 'Please input your phone number!'
              }]
            })(<Input style={{width: '100%'}}/>
          )}
        </FormItem>

        <FormItem
          { ...tailFormItemLayout}
        >
          <Button
            type="primary"
            htmlType = "submit"
          >
            {this.state.isUpdate ? "提交" : "注册"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const UserAdd = Form.create()(RegistrationForm);

export default UserAdd;