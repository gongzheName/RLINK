import React from "react";
import {
  Form,
  Button,
  Upload,
  Icon,
} from 'antd';
const FormItem = Form.Item;

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    return ( <
      Form onSubmit = {
        this.handleSubmit
      } >

      <
      FormItem { ...formItemLayout
      }
      label = "上传批处理文件"
      extra = "json文件" >
      {
        getFieldDecorator('upload', {
          valuePropName: 'fileList',
          getValueFromEvent: this.normFile,
        })( <
          Upload name = "batchfile"
          action = "http://101.236.40.233/admin/addLinksFromFile"
          listType = "text" >
          <
          Button >
          <
          Icon type = "upload" / > 点击上传该附件 <
          /Button> <
          /Upload>
        )
      } <
      /FormItem>

      <
      FormItem wrapperCol = {
        {
          span: 12,
          offset: 6
        }
      } >
      <
      Button type = "primary"
      htmlType = "submit" > 提交 < /Button> <
      /FormItem> <
      /Form>
    );
  }
}

const WrappedDemo = Form.create()(Demo);


class BatchProcess extends React.Component {
  render() {
    return (
      <WrappedDemo/>
    )
  }
}



export default BatchProcess;