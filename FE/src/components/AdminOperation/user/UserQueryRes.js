import React from "react";
import { Table, Button } from 'antd';
import qs from "qs";
import axios from "../../../request/index";

import DialogModal from "../../modal/index";

const fnDel = (ev)=>{
    /*DialogModal.info({
        title: "信息",
        content: ev.target.previousSibling.value
    });*/
    var user_id = ev.target.previousSibling.value; //ev.target同一组件中只能使用一次
    console.log(ev.target)
    DialogModal.confirm({
        title: "删除用户",
        content: "是否确认删除该用户",
        func: function(){
            axios.post("/userDel",
                qs.stringify({
                  request_id: "99",
                  user_id
                })).
            then((data) => {
              data = data.data;
              DialogModal.success({
                title: "用户",
                content: data.resp_msg+":该用户已被删除",
                func: function(){
                  window.location.reload();
                }
              })
            }).
            catch(function(err){
                console.error(err)
            });
        }
    })
}

const updUser = (ev)=>{
    var user_id = ev.target.previousSibling.value;
    window.location.href=
      "#/usr-add?"+
      window.btoa("user_id="+user_id+"&random="+
      Math.random().toString().replace(".", "").substring(1,6));

}

// 表头数据格式
const columns = [{
    title: '用户名',
    dataIndex: 'name',
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
      <a href="javascript:void(0);" onClick={updUser}>修改用户信息</a>
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
        th.fetch({page:1});
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
    axios.post("/userSelectAll",
        qs.stringify({
            request_id: "99",
            page: params.page,
            page_size: 10
        })).
    then((data) => {
      const pagination = { ...th.state.pagination };
      data = data.data;

        for(let i=0; i<data.data.length; i++){
            data.data[i].key = i;
            if(data.data[i].gender == "1"){
                data.data[i].gender = "男";
            }else if(data.data[i].gender == "2"){
                data.data[i].gender = "女";
            }else{
                data.data[i].gender = "未知";
            }
        }
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