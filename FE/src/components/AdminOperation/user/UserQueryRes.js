import React from "react";
import { Table, Button } from 'antd';
import qs from "qs";
import axios from "../../../request/index";

import DialogModal from "../../modal/index";

const fnDel = (ev)=>{
    DialogModal.info({
        title: "信息",
        content: ev.target.previousSibling.value
    });
    return;
    DialogModal.confirm({
        title: "删除用户",
        content: "是否确认删除该用户",
        func: function(){
            DialogModal.success({
                title: "用户",
                content: "该用户已被删除"
            })
        }
    })
}

// 表头数据格式
const columns = [{
    title: '用户名',
    dataIndex: 'username',
}, {
    title: '性别',
    dataIndex: 'gender',
}, {
    title: '昵称',
    dataIndex: 'nickname',
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

class UserQueryRes extends React.Component {
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
        axios.post("http://101.236.40.233/userSelectAll",
                qs.stringify({
                    request_id: "99",
                    page: 1,
                    pageSize: 10
                })).
        then(function(data){
        	console.log(data.data);
        }).catch(function(err){
        	console.error(err)
        })
        axios.post("http://101.236.40.233/userAdd",
            qs.stringify({name:"任帅牛逼",password:"renshuainiubi"})).
        then(function(data){
            console.log(data.data);
        }).catch(function(err){
            console.error(err)
        })
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
    axios.get('/userQuery.json',
      JSON.stringify({results: 10,...params})).then((data) => {
      const pagination = { ...this.state.pagination };
      let data1 = typeof(data.data)=="object"? data.data: JSON.parse(data.data);

        for(let i=0; i<data1.length; i++){
            data1[i].key = i;
            if(data1[i].gender == "1"){
                data1[i].gender = "男";
            }else if(data1[i].gender == "2"){
                data1[i].gender = "女";
            }else{
                data1[i].gender = "性别不明？伪娘：女汉子";
            }
        }
      // Read total count from server
      // pagination.total = data.totalCount;
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

export default UserQueryRes;