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
import axios from "../../../request/index";
import "./index.less";
import qs from "qs";
import queryColumnData_link from "./queryColumnData_link";
import LinkQueryRes from "./LinkQueryRes";
const FormItem = Form.Item;
const Option = Select.Option;

class AdvancedSearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      expand: false,
      queryColumnData_link
    };
  }

  componentWillMount(){
    let fa = this.state.queryColumnData_link,
    options = fa[1].options;

    axios.post("/admin/categorySelectAll",
      qs.stringify({
        request_id: "99",
        page: 1,
        page_size: 100
      })).
    then((data) => {
      data = data.data.data;
      data.map(function(el, index){
        options.push({
          text: el.name,
          value: ""+el.id
        })
      })
      fa[1].options = options;
      this.setState({
        queryColumnData_link:fa
      })
    });

  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      for(let item in values){
        values[item] = (values[item]==undefined)? "": values[item];
      }

      this.props.conds(values);
    });
  }

  // To generate mock Form.Item
  getFields() {
    let fa = this.state.queryColumnData_link;
    const c = fa.length;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{span:8},
      wrapperCol:{span:16}
    };
    const children = [];
    for (let i = 0; i < c; i++) {
      if (fa[i].select) {
        children.push(
          <Col span={8} key={i}>

          <FormItem
            { ...formItemLayout}
            label={fa[i].col_name}
          >
            {
              getFieldDecorator(fa[i].lb_for, {
                rules: [{required:false}]
              })(
                <Select placeholder={fa[i].placeholder}>
                  {
                    fa[i].options.map((el, i)=>(
                      <Option value={el.value} key={i}>{el.text}</Option>
                    ))
                  }
                </Select>
              )
            }
          </FormItem>
        </Col>

        );
      } else {
        children.push(
          <Col span={8} key={i}>
            <FormItem
              {...formItemLayout}
              label={queryColumnData_link[i].col_name}
            >
              {getFieldDecorator(queryColumnData_link[i].lb_for)(
                <Input
                  placeholder={queryColumnData_link[i].placeholder}
                />
              )}
            </FormItem>
          </Col>
        );
      }
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}>
        <Row gutter={40}>
          {this.getFields()}
        </Row>

        <Row>
          <Col span={24} style={{textAlign:'right'}}>
            <Button
              type="primary"
              htmlType="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

var LinkQ = Form.create()(AdvancedSearchForm);
class LinkQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChkbx: [],
      filterObj:{
        name:"",
        category_id:"",
        link_check_state:""
      }
    };
    this.checkboxSel = this.checkboxSel.bind(this);
    this.delLink = this.delLink.bind(this);
    this.conds = this.conds.bind(this);
  }
  checkboxSel(selectedChkbx) {
    this.setState({
      selectedChkbx
    })
  }

  delLink() {
    const link_ids = this.state.selectedChkbx;
    if (link_ids.length >= 1) {
      DialogModal.confirm(
        "是否确认删除该批次链接",
        function() {
          axios.post("/admin/linkDel",
            qs.stringify({
              request_id: "99",
              link_ids: JSON.stringify(link_ids)
            })).
          then((data) => {
            data = data.data;
            if (data.resp_cd == "00") {
              DialogModal.success(
                data.resp_msg + ":该批次链接已被删除",
                function() {
                  window.location.reload();
                }
              );
            } else {
              DialogModal.error("删除失败: 请稍后重试 或 询问网站管理员");
            }
          }).
          catch(function(err) {
            console.error(err)
          });
        }
      );
    } else {
      DialogModal.warning("请至少选择一条链接!");
    }
  }

  conds(filterObj){
    this.setState({
      filterObj
    });
  }

    render() {
      return ( <
        div >
        <LinkQ conds={this.conds}/>
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
        } >新增链接</Button>
        <Button
          type = "primary"
          size = "large"
          onClick = {this.delLink}
          style = {{margin: "30px 20px"}}
        >
          批量删除链接
        </Button>
        {
          < div className = "search-result-list" >
            <LinkQueryRes conds={this.state.filterObj} checkboxSel={this.checkboxSel}/>
          </div>
        }
      </div>
        )
      }
    }

    export default LinkQuery;