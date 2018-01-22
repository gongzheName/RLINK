import React from "react";
import {
  Table
} from 'antd';
import qs from "qs";
import axios from "../../../request/index";

import DialogModal from "../../modal/index";




const data = [];
var dataarr = [];

class CtgrQueryRes extends React.Component {
  constructor(props) {
    super(props);
    this.updCtgr = this.updCtgr.bind(this);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      dataTable: [],
      checkboxSel: this.props.checkboxSel,
      pagination: {},
      data: [],
      columns: [{
        title: '大类ID',
        dataIndex: 'id',
      }, {
        title: '大类名称',
        dataIndex: 'name',
      }, {
        title: '预留字段1',
        dataIndex: 'reserve_col1',
      }, {
        title: '预留字段2',
        dataIndex: 'reserve_col2',
      }, {
        title: '预留字段3',
        dataIndex: 'reserve_col3',
      }, {
        title: '操作',
        dataIndex: 'delete',
        render: (text, record) => (
          <span>
            <input
              type="hidden"
              value={record.id}
            />
            <a
              href="javascript:void(0);"
              onClick={this.updCtgr}
            >修改链接信息</a>
          </span>
        ),
      }]
    };
  }


  updCtgr(ev){
    var id = parseInt(ev.target.previousSibling.value);
    let th = this;
    th.state.data.map(function(el, index){
      if(id == parseInt(el.id)){
        console.log(id, el.name)
        th.props.showModalUpdate(parseInt(id), el.name);
      }
    })
  }

  componentWillMount() {
    var th = this;
    th.fetch({
      page: 1
    });
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
    });
  }

  fetch = (params = {}) => {
    let th = this;
    this.setState({
      loading: true
    });
    axios.post("/admin/categorySelectAll",
      qs.stringify({
        request_id: "99",
        page: params.page,
        page_size: 10
      })).
    then((data) => {
      const pagination = { ...th.state.pagination
      };
      data = data.data;

      // Read total count from server
      pagination.total = data.total_record;
      th.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  }


  render() {
    const {loading,selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}


export default CtgrQueryRes;