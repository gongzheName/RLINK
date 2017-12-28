const queryColumnData = [
    {
        col_name: "用户名",
        placeholder: "请输入用户名",
        lb_for: "username"
    },{
        col_name: "性别",
        placeholder: "--请选择--",
        select: true,
        lb_for: "gender",
        options: [{
            text: "--请选择--",
            value: ""
        },{
            text: "男",
            value: "1"
        },{
            text: "女",
            value: "2"
        }]
    },{
        col_name: "昵称",
        placeholder: "请输入昵称",
        lb_for: "nickname"
    }
]


export default queryColumnData;

