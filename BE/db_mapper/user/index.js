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

    SELECT * FROM `tb_user` LIMIT #{page},#{page_size};

  */}, {
    page: data.page,
    page_size: data.page_size
  });
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
  tbUserFindByPkId:tbUserFindByPkId,
  tbUserUpdate:tbUserUpdate,
  tbUserDelete:tbUserDelete
}


