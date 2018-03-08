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


var tbLinkSelectAll  = function(data){
  return multiline(function(){/*

    SELECT * FROM `tb_link` LIMIT #{page},#{page_size};

  */}, {
    page: data.page,
    page_size: data.page_size
  });
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
  tbLinkFindByPkId:tbLinkFindByPkId,
  tbLinkUpdate:tbLinkUpdate,
  tbLinkDelete:tbLinkDelete
}


