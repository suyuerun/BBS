var nodeUtil = require('util');
const TABLENAME = 'postList';
var userInfoDao = module.exports;
var sqlClient = require('../models/sqlClient').getClient();

userInfoDao.getPostList = function () {
    var sql = nodeUtil.format('select postTitle, postAuthor, pubTime, replyTime from %s', TABLENAME);
    var args = [];
    return sqlClient.query(sql, args);
};
userInfoDao.addNewUser = function (useName, passWord, nickName, role, msgNum) {
    var sql = nodeUtil.format('insert into %s (useName, passWord, nickName, createTime, updateTime, role, msgNum) values (?, ?, ?, ?, ?, ?, ?)', TABLENAME);
    var createTime = new Date().getTime();
    var args = [useName, passWord, nickName, createTime, createTime, role, msgNum];
    return sqlClient.query(sql, args);
};
