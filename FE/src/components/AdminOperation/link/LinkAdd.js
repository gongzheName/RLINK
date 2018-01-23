import React from "react";
import {
  Form,
  Input,
  Button,
  Select
} from 'antd';
import qs from "qs";
import axios from "../../../request/index";
import DialogModal from "../../modal/index";

const FormItem = Form.Item;
const Option = Select.Option;

const userAddUrl = "/admin/userAdd";
const userUpdUrl = "/admin/userUpdate";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    let data = this.props.location.search;
    let isUpdate = false;
    data = parseInt(data.substr(1, ).split("=")[1]);

    if (data > 0 && ((data | 0) === data)) {
      console.log(data);
      isUpdate = true;
    }

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isUpdate,
      ctgrs:[]
    };
  }

  componentWillMount(){
    let th = this;
    axios.post("/admin/categorySelectAll",
      qs.stringify({
        request_id: "99",
        page: 1,
        page_size: 100
      })).
    then((data) => {
      data = data.data.data;
      th.setState({
        ctgrs:data
      })
    });
  }

  getCtgrFields() {
    let ctgrs = this.state.ctgrs;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {xs:{span:24}, sm:{span:5}},
      wrapperCol: {xs:{span:24}, sm:{span:16}},
    };
    return (

      <FormItem
        {...formItemLayout}
        label = "所属大类"
        hasFeedback
        key="999"
      >
        {getFieldDecorator('category_id', {
          rules: [{
            required: true,
            message: '必填字段!'
          }, ],
        })(
          <Select placeholder="请选择一个链接大类">
            {
              ctgrs.map((el, i)=>(
                <Option key={i} value={""+el.id}>{el.name}</Option>
              ))
            }
          </Select>
        )
        }
      </FormItem>

    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        var msg_body = values;
        var request_data = {
          msg_body: JSON.stringify(msg_body),
          request_id: "99"
        };
        console.log('Received values of form: ', request_data);
        axios.post("/admin/linkAdd", qs.stringify(request_data))
          .then(function(data) {
            console.log(data);
          }).catch(function(err) {
            console.error(err);
          })
      });
    });
  }

  render() {
    const {getFieldDecorator}=this.props.form;

    const formItemLayout = {
      labelCol: {xs:{span:24}, sm:{span:5}},
      wrapperCol: {xs:{span:24}, sm:{span:16}},
    };
    const tailFormItemLayout = {
      wrapperCol: {xs:{span:24,offset:0}, sm:{span:16,offset:8}},
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{height: "20px"}}> </div>
        <FormItem
          {...formItemLayout}
          label = "链接名称"
        >
          {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '必填字段!',
              }],
            })(
              <Input placeholder = "请输入连接名称"/>
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label = "链接地址(URL)"
        >
          {getFieldDecorator('link', {
              rules: [{
                required: true,
                message: '必填字段!',
              }],
            })(
              <Input
                placeholder="请输入您喜爱的链接地址"
                readOnly={this.state.isUpdate? true : false}
              />
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label = "链接描述"
        >
          {getFieldDecorator('description', {
              rules: [{
                required: false,
                message: '必填字段!',
              }],
            })(
              <Input placeholder="请对您所添加的链接写一点介绍"/>
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label = "所属用户"
        >
          {getFieldDecorator('user_id', {
            rules: [{
              required: false,
              message: '必填字段!',
            }],
          })(
            <Input placeholder="请对您所添加的链接写一点介绍"/>
          )
          }
        </FormItem>

        {this.getCtgrFields()}

        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const LinkAdd = Form.create()(RegistrationForm);

export default LinkAdd;



/*var title;
var xhr = new XMLHttpRequest();
xhr.open( "get","http://localhost:8888/index.html", true);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
        console.log(xhr.responseText);
        //xhr.responseText;
        console.log(xhr.responseText.match(/<title>([\s\S]*?)<\/title>/)[1])
    }
}
xhr.send();*/