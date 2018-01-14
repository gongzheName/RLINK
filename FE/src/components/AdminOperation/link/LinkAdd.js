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

const userAddUrl = "/userAdd";
const userUpdUrl = "/userUpdate";

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
        /*axios.get("linkUpdate.json", "").then(function(data){
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
        })*/
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

          var msg_body=values;
          var request_data={
            msg_body: JSON.stringify(msg_body),
            request_id:"99"
          };
          console.log('Received values of form: ', request_data);
          axios.post("/linkAdd", qs.stringify(request_data))
          .then(function(data){
            console.log(data);
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







