//大类表具体业务处理
var tbCategory = require("../../db_mapper/category/index");//category表
var conn = require("../../db_mapper/connection/index");//连接数据库


function Add(req, res){ //添加
  try {
    var reqMsgBody = JSON.parse(req.body.msg_body);//获取参数

    //SQL
    var categoryAdd = tbCategory.tbCategoryAdd(reqMsgBody);
    var insert_tb_category = categoryAdd.replace(/''/g, "NULL");

    //数据库操作
    conn.query(insert_tb_category, {}, function (err, rows, fields) {
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
}

function Update(req, res){
  try {
    var reqMsgBody = JSON.parse(req.body.msg_body);//获取参数

    //SQL
    var categoryUpdate = tbCategory.tbCategoryUpdate(reqMsgBody);
    var update_tb_category = categoryUpdate.replace(/''/g, "NULL");

    //数据库操作
    conn.query(update_tb_category, {}, function (err, rows, fields) {
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
}

function SelectAll(req, res){
  try {

    req.body.page = (req.body.page-1)*(req.body.page_size);
    //SQL
    var select_all_by_page_tb_category = tbCategory.tbCategorySelectAll(req.body);

    //数据库操作
    conn.query(select_all_by_page_tb_category, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      var data = [];
      rows.forEach(function(item, index){
        data.push({
          id:item.id,
          name:item.name
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
}

function getInfoById(req, res){
  try {

    //SQL
    var select_by_pk_id_tb_category = tbCategory.tbCategoryFindByPkId(req.body.user_id);

    //数据库操作
    conn.query(select_by_pk_id_tb_category, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      var data = [];
      rows.forEach(function(item, index){
        data.push({
          id:item.id,
          name:item.name
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
}

function Delete(req, res){
  try {

    var category_ids = JSON.parse(req.body.category_ids);
    //SQL
    var delete_by_pk_id_tb_category = tbCategory.tbCategoryDelete(category_ids);

    //数据库操作
    conn.query(delete_by_pk_id_tb_category, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="大类批量删除成功";
      res.send(responseData);
      return;
    });

  }catch(err){//运行错误
    console.log(err);
  }
}


module.exports = {
  Add:Add,
  Update:Update,
  SelectAll:SelectAll,
  getInfoById:getInfoById,
  Delete:Delete
}

