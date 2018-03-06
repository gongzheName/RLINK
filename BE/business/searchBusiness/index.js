
var tbUser = require("../../db_mapper/user/index");//user表
var tbLink = require("../../db_mapper/link/index");//link表
var tbCategory = require("../../db_mapper/category/index");//category表
var search = require("../../db_mapper/search/index");
var conn = require("../../db_mapper/connection/index");//连接数据库

function doService(req, res){
  try {
    //console.log(req.query.wd);
    var keyword = req.query.wd, data=[], responseData={};
    //SQL
    var search_by_key_word = search.searchCategoryName(keyword);

    //数据库操作
    conn.query(search_by_key_word, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      if(rows.length == 0){
        var all_search = search.allSearchCategoryName();
        conn.query(all_search, {}, function(err, rowsEmpty, fields){
          if(err){//操作失败
            console.log(err);
            res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
            return;
          }
          rowsEmpty.forEach(function(item, index){
            var queryData = {keyword:'', category_id:item.id};
            var all_search_link_total = search.allSearchLinkTotal(queryData);
            var promise = new Promise(function(resolve, reject){
              conn.query(all_search_link_total, {}, function(err, rowsIn, fields){
                data.push({
                  category_name:item.name,
                  category_id:item.id,
                  total:rowsIn[0]["COUNT(*)"]
                });
                resolve(0);
              })
            }).then(function(value){
              if(++index == rowsEmpty.length || (rowsEmpty.length==0)){
                //操作成功返回数据
                responseData.resp_cd="00";
                responseData.resp_msg="查询成功";
                responseData.data=data;
                res.send(responseData);
              }
            })
          })
        })
      }
      rows.forEach(function(item, index){

        var queryData = {keyword:keyword, category_id:item.id};
        var search_link_total = search.searchLinkTotal(queryData);
        var promise = new Promise(function(resolve, reject){
          conn.query(search_link_total, {}, function(err, rowsIn, fields){
            data.push({
              category_name:item.name,
              category_id:item.id,
              total:rowsIn[0]["COUNT(*)"]
            });
            resolve(0);
          });
        }).then(function(value){
          //console.log(rows);
          if(++index == rows.length || (rows.length==0)){
            //操作成功返回数据
            responseData.resp_cd="00";
            responseData.resp_msg="查询成功";
            responseData.data=data;
            res.send(responseData);
          }
        })

      })
    });

  }catch(err){//运行错误
    console.log(err);
  }
}


function searchLinkList(req, res){
  try {
    var keyword = req.query.wd, category_id=req.query.category_id,
        data=[], responseData={};
    //SQL
    var search_link_list = search.linkList(req.query);

    //数据库操作
    conn.query(search_link_list, {}, function (err, rows, fields) {
      if(err){//操作失败
        console.log(err);
        res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
        return;
      }

      if(rows.length == 0){
        var search_all_link = search.allLinkList({category_id:req.query.category_id});
        conn.query(search_all_link, {}, function(err, rowsEmpty, fields){
          if(err){//操作失败
            console.log(err);
            res.send({resp_cd:"01",resp_msg:"系统错误，请稍后重试！"});
            return;
          }
          rowsEmpty.forEach(function(item, index){
            data.push({
              name:item.name,
              link:item.link,
              description:item.description,
              update_time:item.update_time
            });
          })
          //操作成功返回数据
          responseData.resp_cd="00";
          responseData.resp_msg="查询成功";
          responseData.data=data;
          res.send(responseData);
        })
      }

      rows.forEach(function(item, index){

        data.push({
          name:item.name,
          link:item.link,
          description:item.description,
          update_time:item.update_time
        });
        //操作成功返回数据
        responseData.resp_cd="00";
        responseData.resp_msg="查询成功";
        responseData.data=data;
        res.send(responseData);
      })
    });

  }catch(err){//运行错误
    console.log(err);
  }
}









module.exports = {
  doService:doService,
  searchLinkList:searchLinkList
}