var multiline = require('../../node_modules/multiline.js/multiline');


var tbCategoryAdd  = function(data){
  return multiline(function(){/*
    INSERT INTO `tb_category`
    (name)
    VALUES
    ('#{name}');
  */}, {
    name:data.name || ''
  });
}


var tbCategoryUpdate  = function(data){
  return multiline(function(){/*

    UPDATE `tb_category` SET name='#{name}' WHERE id='#{id}';

  */}, {
    id:data.id,
    name:data.name || ''
  });
}


var tbCategorySelectAll  = function(data){
  return multiline(function(){/*

    SELECT * FROM `tb_category` LIMIT #{page},#{page_size};

  */}, {
    page: data.page,
    page_size: data.page_size
  });
}


var tbCategoryFindByPkId = function(id){
  return multiline(function(){/*

    SELECT * FROM `tb_category` WHERE id=#{id};

  */}, {
    id:id
  });
}


function delCondition(arr){
  var str = "";
  arr.forEach(function(item, index){
    if(index==0){
      str += ("id="+item);
    }else{
      str += (" OR id="+item);
    }
  })
  return str+";";
}

var tbCategoryDelete = function(user_ids){
  var sql = "DELETE FROM `tb_category` WHERE "+delCondition(user_ids);
  return sql;
}

module.exports = {
  tbCategoryAdd:tbCategoryAdd,
  tbCategorySelectAll:tbCategorySelectAll,
  tbCategoryFindByPkId:tbCategoryFindByPkId,
  tbCategoryUpdate:tbCategoryUpdate,
  tbCategoryDelete:tbCategoryDelete
}


