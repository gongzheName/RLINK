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
  window.location.href =
    "#/link-add?" +
    window.btoa("link_id=" + link_id + "&random=" +
      Math.random().toString().replace(".", "").substring(1, 6));

}

const columns = [{
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
}];

const data = [];
var dataarr = [];

class CtgrQueryRes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      dataTable: [],
      checkboxSel: this.props.checkboxSel,
      pagination: {},
      data: []
    };
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
    axios.post("/linkSelectAll",
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


export default CtgrQueryRes;