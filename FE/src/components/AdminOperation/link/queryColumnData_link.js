const queryColumnData_link = [{
  col_name: "链接名称",
  placeholder: "请输入链接名称",
  lb_for: "name"
}, {
  col_name: "所属大类",
  placeholder: "--所有--",
  select: true,
  lb_for: "category_id",
  options: [{
    text: "--所有--",
    value: ""
  }, {
    text: "未分类",
    value: "NULL"
  }]
}, {
  col_name: "审核状态",
  placeholder: "--所有--",
  select: true,
  lb_for: "link_check_state",
  options: [{
    text: "--所有--",
    value: ""
  }, {
    text: "未审核",
    value: "0"
  }, {
    text: "审核通过",
    value: "1"
  }]
}]


export default queryColumnData_link;