import React from "react";

import DialogModal from "../../modal/index";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select
} from 'antd';
import axios from "axios";
import "./index.less";
import queryColumnData_link from "./queryColumnData_link";
import LinkQueryRes from "./LinkQueryRes";
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

      axios.get("http://localhost/rl/").then(function(data) {
        console.log(data.data);
      }).catch(function(err) {
        console.error(err)
      })
    });
  }

  // To generate mock Form.Item
  getFields() {
    const c = queryColumnData_link.length;
    const {
      getFieldDecorator
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    };
    const children = [];
    for (let i = 0; i < c; i++) {
      if (queryColumnData_link[i].select) {
        children.push( <
          Col span = {
            8
          }
          key = {
            i
          } >

          <
          FormItem { ...formItemLayout
          }
          label = {
            queryColumnData_link[i].col_name
          } > {
            getFieldDecorator(queryColumnData_link[i].lb_for, {
              rules: [{
                required: false
              }]
            })(

              <
              Select placeholder = {
                queryColumnData_link[i].placeholder
              } > {
                queryColumnData_link[i].options.map((el, i) => ( <
                  Option value = {
                    el.value
                  }
                  key = {
                    i
                  } > {
                    el.text
                  } < /Option>
                ))
              } <
              /Select>
            )
          } <
          /FormItem> <
          /Col>

        );
      } else {
        children.push( <
          Col span = {
            8
          }
          key = {
            i
          } >
          <
          FormItem { ...formItemLayout
          }
          label = {
            queryColumnData_link[i].col_name
          } > {
            getFieldDecorator(queryColumnData_link[i].lb_for)( <
              Input placeholder = {
                queryColumnData_link[i].placeholder
              }
              />
            )
          } <
          /FormItem> <
          /Col>
        );
      }
    }
    return children;
  }

  render() {
    return ( <
      Form className = "ant-advanced-search-form"
      onSubmit = {
        this.handleSearch
      } >
      <
      Row gutter = {
        40
      } > {
        this.getFields()
      } < /Row> <
      Row >
      <
      Col span = {
        24
      }
      style = {
        {
          textAlign: 'right'
        }
      } >
      <
      Button type = "primary"
      htmlType = "submit" > Search < /Button> <
      /Col> <
      /Row> <
      /Form>
    );
  }
}

var LinkQ = Form.create()(AdvancedSearchForm);
class LinkQuery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedChkbx: []
      };
      this.checkboxSel = this.checkboxSel.bind(this);
      this.updUser = this.updUser.bind(this);
    }
    checkboxSel(selectedChkbx) {
      this.setState({
        selectedChkbx
      })
    }
    updUser() {
      const selectedChkbx = this.state.selectedChkbx;
      axios.get("../../../src/server/userAdd.json", "").then(function(data) {
        console.log(typeof data.data)

      }).catch(function(err) {
        console.error(err)
      })
      if (selectedChkbx.length == 1 && selectedChkbx[0] >= 0) {
        window.location.href = "/#/link-add?id=1";
      } else {
        DialogModal.warning({
          title: "警告",
          content: "每次只能变更一条记录"
        });
      }

    }
    render() {
      return ( <
        div >
        <
        LinkQ / >
        <
        Button type = "primary"
        size = "large"
        onClick = {
          function() {
            window.location.href = "/#/link-add"
          }
        }
        style = {
          {
            margin: "30px 20px"
          }
        } >
        新增链接 <
        /Button> <
        Button type = "primary"
        size = "large"
        onClick = {
          this.updUser
        }
        style = {
          {
            margin: "30px 20px"
          }
        } >
        批量删除链接 <
        /Button> { < div className = "search-result-list" >
            <
            LinkQueryRes
          checkboxSel = {
            this.checkboxSel
          }
          /> <
          /div>} <
          /div>
        )
      }
    }

    export default LinkQuery;