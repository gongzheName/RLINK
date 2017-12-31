import React from "react";
import { Table, Button } from 'antd';
import axios from "axios";

import DialogModal from "../../modal/index";

const fnDel = (ev)=>{
    console.log(ev.target.previousSibling.value)
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

const data = [];
var dataarr = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        username: `Edward King ${i}`,
        gender: "男",
        nickname: `London, Park Lane no. ${i}`,
    });
}



class UserQueryRes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            dataTable: []
        };
    }

    componentWillMount(){
        var th = this;
        axios.get("../../../src/server/userQuery.json")
            .then(function(data1){
                console.log(data1);
                data1 = typeof(data1.data)=="object"? data1.data: JSON.parse(data1.data);

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
                dataarr = data1;
                th.setState({
                    selectedRowKeys: [],
                    loading: false,
                    dataTable:  data1
                })
                console.log(dataarr, "asfsfdgdfh")
            }).catch(function(err){
            console.error(err);
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
        this.setState({ selectedRowKeys });
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
                    dataSource={dataarr}
                />
            </div>
        );
    }
}

export default UserQueryRes;