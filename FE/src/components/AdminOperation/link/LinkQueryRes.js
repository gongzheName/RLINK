import React from "react";
import { Table, Button } from 'antd';
import axios from "../../../request/index";

import DialogModal from "../../modal/index";

const fnDel = (ev)=>{
    //console.log(ev.target.previousSibling.value)
    DialogModal.info({
        title: "信息",
        content: ev.target.previousSibling.value
    });
    return;
    DialogModal.confirm({
        title: "删除用户",
        content: "是否确认删除该链接",
        func: function(){
            DialogModal.success({
                title: "用户",
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
            dataTable: [],
            checkboxSel: props.checkboxSel
        };
    }

    componentWillMount(){
        var th = this;
        axios.get("linkQuery.json")
            .then(function(data1){
                console.log(data1.data);
                data1 = typeof(data1.data)=="object"? data1.data: JSON.parse(data1.data);
                dataarr = data1;
                for(let i=0; i<data1.length; i++){
                    data1[i].key = i;
                }

                th.setState({
                    selectedRowKeys: [],
                    loading: false,
                    dataTable:  data1
                })
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
        let fn = this.state.checkboxSel;
        fn(selectedRowKeys);
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