
var Util = require("../../util/index"); //工具类


//链接表具体业务处理
var tbLink = require("../../db_mapper/link/index");//link表
var conn = require("../../db_mapper/connection/index");//连接数据库


function Add(req, res){ //添加
  try {
    var reqMsgBody = JSON.parse(req.body.msg_body);//获取参数

    //SQL
    var linkAdd = tbLink.tbLinkAdd(reqMsgBody);
    var insert_tb_link = linkAdd.replace(/''/g, "NULL");

    //数据库操作
    conn.query(insert_tb_link, {}, function (err, rows, fields) {
      if(err){//操作失败
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="新增链接成功";
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
    reqMsgBody.update_datetime = Util.getRealTime();//获取实时时间
    //SQL
    var linkUpdate = tbLink.tbLinkUpdate(reqMsgBody);
    var update_tb_link = linkUpdate.replace(/''/g, "NULL");
    //数据库操作
    conn.query(update_tb_link, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="链接信息修改成功";
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
    var select_all_by_page_tb_link = tbLink.tbLinkSelectAll(req.body), responseData={};

    //数据库操作
    conn.query(select_all_by_page_tb_link, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      if(rows.length <= 0){
        responseData.resp_cd="00";
        responseData.resp_msg="分页查询成功";
        responseData.data=[];
        res.send(responseData);
      }else{
        var data = [];
        rows.forEach(function(item, index){

          var promise = new Promise(function(resolve, reject){
            conn.query("SELECT name FROM tb_category WHERE id="+item.category_id,
              {}, function(err, rowsIn, field){
              if(err){//操作失败
                console.log(err);
                res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
                return;
              }
              resolve(rowsIn[0].name);
            });
          }).then(function(value){
            data.push({
              id:item.id,
              name:item.name,
              link:item.link,
              //category_id:item.category_id,
              category_id:value,
              link_check_state:item.link_check_state
            })
            if(++index == rows.length || (rows.length==0)){
              //操作成功返回数据
              responseData.resp_cd="00";
              responseData.resp_msg="分页查询成功";
              responseData.data=data;
              res.send(responseData);
            }
          })
        });
      }
    });

  }catch(err){//运行错误
    console.log(err);
  }
}

function getInfoById(req, res){
  try {

    //SQL
    var select_by_pk_id_tb_link = tbLink.tbLinkFindByPkId(req.body.link_id);

    //数据库操作
    conn.query(select_by_pk_id_tb_link, {}, function (err, rows, fields) {
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
          link:item.link,
          user_id:item.user_id,
          category_id:item.category_id,
          description:item.description
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

    var link_ids = JSON.parse(req.body.link_ids);
    //SQL
    var delete_by_pk_id_tb_link = tbLink.tbLinkDelete(link_ids);

    //数据库操作
    conn.query(delete_by_pk_id_tb_link, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      //操作成功返回数据
      var responseData={};
      responseData.resp_cd="00";
      responseData.resp_msg="链接批量删除成功";
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

