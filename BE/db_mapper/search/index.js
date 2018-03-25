var multiline = require('../../node_modules/multiline.js/multiline');







var searchCategoryName = function(keyword){
  return multiline(function(){/*

    SELECT id, name FROM `tb_category` WHERE id IN(
      SELECT category_id FROM `tb_link` WHERE
        name LIKE '%#{keyword}%' OR link LIKE '%#{keyword}%'
        OR description LIKE '%#{keyword}%');

  */}, {
    keyword: keyword
  });
}

var searchLinkTotal = function(data){
  return multiline(function(){/*

    SELECT COUNT(*) FROM `tb_link` WHERE category_id=#{category_id} AND
        (name LIKE '%#{keyword}%' OR link LIKE '%#{keyword}%'
        OR description LIKE '%#{keyword}%');

  */}, {
    keyword: data.keyword,
    category_id: data.category_id
  });
}

var linkList = function(data){
  return multiline(function(){/*

    SELECT * FROM `tb_link` WHERE category_id=#{category_id} AND
        (name LIKE '%#{keyword}%' OR link LIKE '%#{keyword}%'
        OR description LIKE '%#{keyword}%')
        ORDER BY update_datetime DESC LIMIT #{page},#{page_size};

  */}, {
    keyword: data.wd,
    category_id: data.category_id,
    page: data.page,
    page_size:data.page_size
  });
}


var allSearchCategoryName = function(keyword){
  return multiline(function(){/*

    SELECT id, name FROM `tb_category`;

  */}, {
    keyword: keyword
  });
}

var allSearchLinkTotal = function(data){
  return multiline(function(){/*

    SELECT COUNT(*) FROM `tb_link` WHERE category_id=#{category_id};

  */}, {
    keyword: data.keyword,
    category_id: data.category_id
  });
}

var allLinkList = function(data){
  return multiline(function(){/*

    SELECT * FROM `tb_link` WHERE category_id=#{category_id}
      ORDER BY update_datetime DESC LIMIT #{page},#{page_size};

  */}, {
    keyword: data.keyword,
    category_id: data.category_id,
    page: data.page,
    page_size:data.page_size
  });
}

module.exports = {
  searchCategoryName:searchCategoryName,
  searchLinkTotal:searchLinkTotal,
  linkList:linkList,
  allSearchCategoryName:allSearchCategoryName,
  allSearchLinkTotal:allSearchLinkTotal,
  allLinkList:allLinkList
}
