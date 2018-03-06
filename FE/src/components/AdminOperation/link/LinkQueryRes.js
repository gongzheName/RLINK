import React from "react";
import {
  Table,
  Button
} from 'antd';
import qs from "qs";
import axios from "../../../request/index";

import DialogModal from "../../modal/index";

const updLink = (ev) => {
  var link_id = ev.target.previousSibling.value;
  console.log(link_id)
  window.location.href =
    "#/link-add?" +
    window.btoa("link_id=" + link_id + "&random=" +
      Math.random().toString().replace(".", "").substring(1, 6));

}

const columns = [{
  title: '链接名称',
  dataIndex: 'name',
}, {
  title: '链接地址',
  dataIndex: 'link',
}, {
  title: '所属类别',
  dataIndex: 'category_id',
}, {
  title: '审核状态',
  dataIndex: 'link_check_state',
  render: (text, record) => {
    switch(text){
      case 0:
        return "未审核";
        break;
      case 1:
        return "审核通过";
        break;
    }
  }
}, {
  title: '操作',
  dataIndex: 'delete',
  render: (text, record) => (
    <span>
      <input type="hidden" value={record.id}/>
      <a href="javascript:void(0);" onClick={updLink}>修改链接信息</a>
    </span>
  ),
}];

const data = [];
var dataarr = [];

class LinkQueryRes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      dataTable: [],
      checkboxSel: this.props.checkboxSel,
      pagination: {},
      data: [],
      conditions: this.props.conds
    };
  }

  componentWillMount() {
    var th = this;
    th.fetch({
      page: 1,
      conditions: JSON.stringify(this.state.conds)
    });
  }

  componentWillReceiveProps(nextProps){
    var th = this;
    this.setState({
      conds:nextProps.conds
    }, function(){
      th.fetch({
      page: 1,
      conditions: JSON.stringify(this.state.conds)
    });
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    let fn = this.state.checkboxSel;
    fn(selectedRowKeys);
    this.setState({
      selectedRowKeys
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination
    };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      ...filters,
      conditions: JSON.stringify(this.state.conds)
    });
  }

  fetch = (params = {}) => {
    let th = this;
    this.setState({
      loading: true
    });
    axios.post("/admin/linkSelectAll",
      qs.stringify({
        page: params.page,
        page_size: 10,
        conditions: params.conditions
      })).
    then((data) => {
      const pagination = { ...th.state.pagination
      };
      data = data.data;

      // Read total count from server
      console.log(data);
      pagination.total = data.total_record;
      th.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  }


  render() {
    const {
      loading,
      selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return ( <
      div >
      <
      Table rowSelection = {
        rowSelection
      }
      columns = {
        columns
      }
      dataSource = {
        this.state.data
      }
      pagination = {
        this.state.pagination
      }
      loading = {
        this.state.loading
      }
      onChange = {
        this.handleTableChange
      }
      rowKey = {
        record => record.id
      }
      /> <
      /div>
    );
  }
}

export default LinkQueryRes;