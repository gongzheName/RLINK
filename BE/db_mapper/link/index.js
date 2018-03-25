var multiline = require('../../node_modules/multiline.js/multiline');


var tbLinkAdd  = function(data){
  return multiline(function(){/*
    INSERT INTO `tb_link`
    (name, link, user_id, category_id, description)
    VALUES
    ('#{name}', '#{link}', '#{user_id}', '#{category_id}', '#{description}');
  */}, {
    name:data.name,
    link:data.link,
    user_id:data.user_id || '',
    category_id:data.category_id || '',
    description:data.description || ''
  });
}


var tbLinkUpdate  = function(data){
  return multiline(function(){/*

    UPDATE `tb_link` SET name='#{name}', link='#{link}', user_id='#{user_id}',
    category_id='#{category_id}', description='#{description}',
    update_datetime='#{update_datetime}'
    WHERE id='#{id}';

  */}, {
    id:data.id,
    name:data.name,
    link:data.link,
    user_id:data.user_id || '',
    category_id:data.category_id || '',
    description:data.description || '',
    update_datetime:data.update_datetime
  });
}


var tbLinkTotal = function(data){
  var sql = "SELECT COUNT(*) FROM `tb_link` WHERE ";
  if(data.name){
    sql = sql + "name='"+data.name+"' AND ";
  }
  if(data.link){
    sql = sql + "link='"+data.link+"' AND ";
  }
  if(data.link_check_state){
    sql = sql + "link_check_state='"+data.link_check_state+"'";
  }
  sql += ";";
  sql = sql.replace("AND ;", ";");
  sql = sql.replace("WHERE ;", ";");
  return sql;

}


var tbLinkSelectAll  = function(data){
  return multiline(function(){/*

    SELECT * FROM `tb_link` ORDER BY update_time DESC LIMIT #{page},#{page_size};

  */}, {
    page: data.page,
    page_size: data.page_size
  });
}


var tbLinkSelectAllCond = function(data){
  var sql = "SELECT * FROM `tb_link` WHERE ";
  if(data.conditions.name){
    sql = sql + "name='"+data.conditions.name+"' AND ";
  }
  if(data.conditions.gender){
    sql = sql + "category_id='"+data.conditions.category_id+"' AND ";
  }
  if(data.conditions.nickname){
    sql = sql + "link_check_state='"+data.conditions.link_check_state+"' AND ";
  }
  sql = sql + "ORDER BY update_datetime DESC LIMIT " + data.page+", "+data.page_size+";";
  sql = sql.replace("AND ORDER", "ORDER");
  sql = sql.replace("WHERE ORDER", "ORDER");
  return sql;
}


var tbLinkFindByPkId = function(id){
  return multiline(function(){/*

    SELECT * FROM `tb_link` WHERE id=#{id};

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

var tbLinkDelete = function(user_ids){
  var sql = "DELETE FROM `tb_link` WHERE "+delCondition(user_ids);
  return sql;
}


module.exports = {
  tbLinkAdd:tbLinkAdd,
  tbLinkSelectAll:tbLinkSelectAll,
  tbLinkSelectAllCond:tbLinkSelectAllCond,
  tbLinkTotal:tbLinkTotal,
  tbLinkFindByPkId:tbLinkFindByPkId,
  tbLinkUpdate:tbLinkUpdate,
  tbLinkDelete:tbLinkDelete
}


