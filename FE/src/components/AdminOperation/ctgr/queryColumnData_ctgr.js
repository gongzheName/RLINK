const queryColumnData_ctgr = [
    {
        col_name: "链接名称",
        placeholder: "请输入链接名称",
        lb_for: "name"
    },{
        col_name: "所属大类",
        placeholder: "--请选择--",
        select: true,
        lb_for: "category_id",
        options: [{
            text: "--请选择--",
            value: ""
        },{
            text: "博客",
            value: "1"
        },{
            text: "生活",
            value: "2"
        }]
    },{
        col_name: "相关联图标",
        placeholder: "--请选择--",
        select: true,
        lb_for: "icon_id",
        options: [{
            text: "--请选择--",
            value: ""
        },{
            text: "微信",
            value: "1"
        },{
            text: "支付宝",
            value: "2"
        }]
    }
]


export default queryColumnData_ctgr;

