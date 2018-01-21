




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

    //SQL
    var user_ids = req.body.user_ids;
    user_ids.forEach(function(item, index){

    })
    var select_by_pk_id_tb_user = tbUser.tbUserDelete(req.body.user_id);

    //数据库操作
    conn.query(select_by_pk_id_tb_user, {}, function (err, rows, fields) {
      if(err){//操作失败
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