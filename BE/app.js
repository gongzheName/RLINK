var express = require("express");
var port = process.env.port || 8000;
var app = express();
var conn = require("./db_mapper/connection/index");//连接数据库
var bodyParser = require("body-parser");
var tbUser = require("./db_mapper/user/index");//user表
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
    if(req.body.request_id=="99"){//校验是否有权限
      next();
    }
  }
});


app.post("/userAdd", function(req, res){
  try {
    var reqMsgBody = JSON.parse(req.body.msg_body);//获取参数
    reqMsgBody.password = md5(reqMsgBody.password);//MD5加密

    //SQL
    var userAdd = tbUser.tbUserAdd(reqMsgBody);
    var insert_tb_user = userAdd.replace(/''/g, "NULL");

    //数据库操作
    conn.query(insert_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="注册成功";
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
});


app.post("/userUpdate", function(req, res){
  try {
    var reqMsgBody = JSON.parse(req.body.msg_body);//获取参数

    //SQL
    var userAdd = tbUser.tbUserUpdate(reqMsgBody);
    var update_tb_user = userAdd.replace(/''/g, "NULL");

    //数据库操作
    conn.query(update_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="信息修改成功";
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
});


app.post("/userSelectAll", function(req, res){
  try {

    req.body.page = (req.body.page-1)*(req.body.page_size);
    //SQL
    var select_all_by_page_tb_user = tbUser.tbUserSelectAll(req.body);

    //数据库操作
    conn.query(select_all_by_page_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      var data = [];
      rows.forEach(function(item, index){
        data.push({
          id:item.id,
          name:item.name,
          gender:item.gender,
          nickname:item.nickname
        })
      });

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="分页查询成功";
      responseData.data=data;
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
})

app.post("/getUserById", function(req, res){
  try {

    //SQL
    var select_by_pk_id_tb_user = tbUser.tbUserFindByPkId(req.body.user_id);

    //数据库操作
    conn.query(select_by_pk_id_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      var data = [];
      rows.forEach(function(item, index){
        data.push({
          id:item.id,
          name:item.name,
          gender:item.gender,
          nickname:item.nickname,
          introduce:item.introduce,
          phone:item.phone,
          birth:item.birth,
          email:item.email
        })
      });

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="主键查询成功";
      responseData.data=data;
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
})


app.post("/userDel", function(req, res){
  try {

    var user_ids = JSON.parse(req.body.user_ids);
    //SQL
    var delete_by_pk_id_tb_user = tbUser.tbUserDelete(user_ids);

    //数据库操作
    conn.query(delete_by_pk_id_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="用户批量删除成功";
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
})










