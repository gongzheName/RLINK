var multiline = require('../../node_modules/multiline.js/multiline');


var tbUserAdd  = function(data){
  return multiline(function(){/*
    INSERT INTO `tb_user`
    (name, password, gender, birth, nickname, avatar, introduce, email, phone)
    VALUES
    ('#{name}', '#{password}', '#{gender}', '#{birth}', '#{nickname}', '#{avatar}',
    '#{introduce}', '#{email}', '#{phone}');
  */}, {
    name:data.name,
    password:data.password,
    gender:data.gender || '',
    birth:data.birth || '',
    nickname:data.nickname,
    avatar:data.avatar || '',
    introduce:data.introduce || '',
    email:data.email || '',
    phone:data.phone || ''
  });
}


var tbUserUpdate  = function(data){
  return multiline(function(){/*

    UPDATE `tb_user` SET name='#{name}', gender='#{gender}', birth='#{birth}',
    nickname='#{nickname}', introduce='#{introduce}', email='#{email}', phone='#{phone}'
    WHERE id='#{id}';

  */}, {
    id:data.id,
    name:data.name,
    gender:data.gender || '',
    birth:data.birth || '',
    nickname:data.nickname,
    avatar:data.avatar || '',
    introduce:data.introduce || '',
    email:data.email || '',
    phone:data.phone || ''
  });
}


var tbUserSelectAll  = function(data){

  return multiline(function(){/*

    SELECT * FROM `tb_user` WHERE name='#{name}' AND gender='#{gender}'
    AND nickname='#{nickname}' LIMIT #{page},#{page_size};

  */}, {
    page: data.page,
    page_size: data.page_size,
    name: data.conditions.name,
    gender:data.conditions.gender,
    nickname:data.conditions.nickname
  });
}


var tbUserSelectAllCond = function(data){
  var sql = "SELECT * FROM `tb_user` WHERE ";
  if(data.conditions.name){
    sql = sql + "name='"+data.conditions.name+"' AND ";
  }
  if(data.conditions.gender){
    sql = sql + "gender='"+data.conditions.gender+"' AND ";
  }
  if(data.conditions.nickname){
    sql = sql + "nickname='"+data.conditions.nickname+"';";
  }
  sql = sql + "LIMIT " + data.page+", "+data.page_size+";";
  sql = sql.replace("AND LIMIT", "LIMIT");
  sql = sql.replace("WHERE LIMIT", "LIMIT");
  return sql;
}


var tbUserTotal = function(data){
  var sql = "SELECT COUNT(*) FROM `tb_user` WHERE ";
  if(data.name){
    sql = sql + "name='"+data.name+"' AND ";
  }
  if(data.gender){
    sql = sql + "gender='"+data.gender+"' AND ";
  }
  if(data.nickname){
    sql = sql + "nickname='"+data.nickname+"'";
  }
  sql += ";";
  sql = sql.replace("AND ;", ";");
  sql = sql.replace("WHERE ;", ";");
  return sql;

}


var tbUserFindByPkId = function(id){
  return multiline(function(){/*

    SELECT * FROM `tb_user` WHERE id=#{id};

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

var tbUserDelete = function(user_ids){
  var sql = "DELETE FROM `tb_user` WHERE "+delCondition(user_ids);
  return sql;
}

module.exports = {
  tbUserAdd:tbUserAdd,
  tbUserSelectAll:tbUserSelectAll,
  tbUserSelectAllCond:tbUserSelectAllCond,
  tbUserTotal:tbUserTotal,
  tbUserFindByPkId:tbUserFindByPkId,
  tbUserUpdate:tbUserUpdate,
  tbUserDelete:tbUserDelete
}


