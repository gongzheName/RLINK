import React from "react";
import { Table, Button } from 'antd';
import axios from "../../../request/index";

import DialogModal from "../../modal/index";

const fnDel = (ev)=>{
    DialogModal.info({
        title: "信息",
        content: ev.target.previousSibling.value
    });
    return;
    DialogModal.confirm({
        title: "删除链接",
        content: "是否确认删除该链接",
        func: function(){
            DialogModal.success({
                title: "链接",
                content: "该链接已被删除"
            })
        }
    })
}

const columns = [{
    title: '链接名称',
    dataIndex: 'name',
}, {
    title: '链接地址',
    dataIndex: 'link',
}, {
    title: '所属类别',
    dataIndex: 'category',
}, {
    title: '相关联icon',
    dataIndex: 'link_icon_url',
    render: (text, record) => (
        <img width="27px" src={record.link_icon_url} />
    ),
}, {
    title: '操作',
    dataIndex: 'delete',
    render: (text, record) => (
        <span>
            <input type="hidden" value={record.id}/>
      <a href="javascript:void(0);" onClick={fnDel}>删除</a>
    </span>
    ),
}];

const data = [];
var dataarr = [];

class LinkQueryRes extends React.Component {
    constructor(props){
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

    componentWillMount(){
        var th = this;
        th.fetch();
    }


    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let fn = this.state.checkboxSel;
        fn(selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
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
    this.setState({ loading: true });
    axios.get('/linkQuery.json',
      JSON.stringify({results: 10,...params})).then((data) => {
      const pagination = { ...this.state.pagination };
      
      pagination.total = 200;
      th.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  }


    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
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

export default LinkQueryRes;