var express = require("express");
var port = process.env.port || 8000;
var app = express();
var conn = require("./db_mapper/connection/index");//连接数据库
var bodyParser = require("body-parser");
var tbUser = require("./db_mapper/user/index");//user表
var TbUserBusiness = require("./business/userBusiness/index");
var TbLinkBusiness = require("./business/linkBusiness/index");
var TbCategoryBusiness = require("./business/categoryBusiness/index");

var md5=require("md5");//MD5加密
app.use(bodyParser.urlencoded({ extended: false }));// 解析post报文
app.listen(port);

try {
  conn.connect();
}catch(err) {
  console.log(err)
}


//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    /*if(req.body.request_id=="99"){//校验是否有权限
      next();
    }else{
      res.send({resp_cd:"96",resp_msg:"您没有该操作权限！"});
    }*/
    next();
  }
});


app.post("/admin/userAdd", TbUserBusiness.Add);
app.post("/admin/userUpdate", TbUserBusiness.Update);
app.post("/admin/userSelectAll", TbUserBusiness.SelectAll);
app.post("/admin/getUserById", TbUserBusiness.getInfoById);
app.post("/admin/userDel", TbUserBusiness.Delete);


app.post("/admin/linkAdd", TbLinkBusiness.Add);
app.post("/admin/linkUpdate", TbLinkBusiness.Update);
app.post("/admin/linkSelectAll", TbLinkBusiness.SelectAll);
app.post("/admin/getLinkById", TbLinkBusiness.getInfoById);
app.post("/admin/linkDel", TbLinkBusiness.Delete);


app.post("/admin/categoryAdd", TbCategoryBusiness.Add);
app.post("/admin/categoryUpdate", TbCategoryBusiness.Update);
app.post("/admin/categorySelectAll", TbCategoryBusiness.SelectAll);
app.post("/admin/getCategoryById", TbCategoryBusiness.getInfoById);
app.post("/admin/categoryDel", TbCategoryBusiness.Delete);









