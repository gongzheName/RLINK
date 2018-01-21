

//传统模块示例（推荐）
exports.add=add;


// 模块成为特别的对象类型: 真实存在
module.exports = add;

//单线程和多线程
//IO
//阻塞和非阻塞
//EventEmmitter





show create database db_name;
show create table tb_name;

CREATE DATABASE `rlink` DEFAULT CHARACTER SET utf8;

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `introduce` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `register_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login_count` int(11) NOT NULL DEFAULT '0',
  `last_login_datetime` datetime DEFAULT NULL,
  `bonus` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
ALTER TABLE `tb_user` ALTER COLUMN bonus set default 0;


CREATE TABLE `tb_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `tb_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `link` varchar(300) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `add_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) DEFAULT NULL,
  `link_check_state` smallint(6) NOT NULL DEFAULT '0',
  `complaints_count` int(11) NOT NULL DEFAULT '0',
  `visit_count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `tb_link_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tb_category` (`id`),
  CONSTRAINT `tb_link_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) DEFAULT CHARSET=utf8;




set password = password('gongzhe');
flush privileges;




cnpm install multiline.js




