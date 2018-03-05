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
    let link_id = this.props.location.search; //获取base64编码
    let isUpdate = false;
    link_id = window.atob(link_id.substr(1, )); //解析
    console.log(link_id)
    link_id = parseInt(link_id.split("=")[1]);

    if (link_id > 0 && ((link_id | 0) === link_id)) {
      isUpdate = true;
      let th = this;

      axios.post("/admin/getLinkById",
        qs.stringify({
          link_id
        })).then(function(data) {
        let d = data.data.data[0]; //查询数据
        console.log(d)

        th.props.form.setFieldsValue({
          name: d.name,
          link: d.link,
          description: d.description,
          category_id: d.category_id
        });
      })
    }

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isUpdate,
      ctgrs:[],
      link_id
    };

  }

  componentWillMount(){
    let th = this;
    axios.post("/admin/categorySelectAll",
      qs.stringify({
        page: 1,
        page_size: 100
      })).
    then((data) => {
      console.log(data)
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
          initialValue: "1",
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

        values.user_id = "1";
        var msg_body = values;
        var request_data = {
          msg_body: JSON.stringify(msg_body),
        };
        console.log('Received values of form: ', request_data);
        axios.post("/admin/linkAdd", qs.stringify(request_data))
          .then(function(data) {
            data = data.data;
            if(data.resp_cd == "00"){
              DialogModal.info(
                "新增链接成功",
                function(){
                  window.location.href="#/link-mng";
                }
              )
            }
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