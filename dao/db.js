/**
 * 数据库JS
 */
var setting = require('setting');
//mongodb模块
var db = require('mongodb').Db;
var conn = require('mongodb').Connection;
var server = require('mongodb').Server;
//创建数据库连接
module.exports = new db(setting.db,new Server(setting.host,conn.DEFAULE.PORT,{})); 